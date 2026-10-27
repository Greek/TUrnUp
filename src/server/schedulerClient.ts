import {
  Client,
  Metadata,
  credentials,
  type ServiceError,
} from "@grpc/grpc-js";
import { env } from "~/env";

interface SnapshotRequest {
  namespace: string;
}

interface SnapshotResponse {
  snapshot: string;
}

function encodeVarint(value: number): Buffer {
  const bytes: number[] = [];
  while (value > 0x7f) {
    bytes.push((value & 0x7f) | 0x80);
    value = Math.floor(value / 0x80);
  }
  bytes.push(value);
  return Buffer.from(bytes);
}

function encodeSnapshotRequest({ namespace }: SnapshotRequest): Buffer {
  const encodedNamespace = Buffer.from(namespace, "utf8");
  return Buffer.concat([
    Buffer.from([0x0a]),
    encodeVarint(encodedNamespace.length),
    encodedNamespace,
  ]);
}

function decodeSnapshotResponse(bytes: Buffer): SnapshotResponse {
  let offset = 0;
  const readVarint = (): number => {
    let value = 0;
    let shift = 0;
    while (offset < bytes.length && shift < 56) {
      const byte = bytes[offset++]!;
      value += (byte & 0x7f) * 2 ** shift;
      if ((byte & 0x80) === 0 && Number.isSafeInteger(value)) return value;
      shift += 7;
    }
    throw new Error("Malformed scheduler protobuf response");
  };

  while (offset < bytes.length) {
    const tag = readVarint();
    const fieldNumber = tag >>> 3;
    const wireType = tag & 0x07;

    if (fieldNumber === 1) {
      if (wireType !== 2) {
        throw new Error("Malformed scheduler snapshot field");
      }
      const length = readVarint();
      const end = offset + length;
      if (end > bytes.length) {
        throw new Error("Truncated scheduler snapshot field");
      }
      return { snapshot: bytes.toString("utf8", offset, end) };
    }

    switch (wireType) {
      case 0:
        readVarint();
        break;
      case 1:
        offset += 8;
        break;
      case 2:
        offset += readVarint();
        break;
      case 5:
        offset += 4;
        break;
      default:
        throw new Error("Unsupported scheduler protobuf wire type");
    }
    if (offset > bytes.length) {
      throw new Error("Truncated scheduler protobuf response");
    }
  }

  return { snapshot: "" };
}

let schedulerClient: Client | undefined;

function getSchedulerClient(): Client {
  if (!env.SCHEDULER_GRPC_ADDRESS || !env.SCHEDULER_AUTH_TOKEN) {
    throw new Error("Scheduler gRPC configuration is missing");
  }

  schedulerClient ??= new Client(
    env.SCHEDULER_GRPC_ADDRESS,
    credentials.createInsecure(),
  );
  return schedulerClient;
}

export function getSchedulerSnapshot(namespace: string): Promise<string> {
  const token = env.SCHEDULER_AUTH_TOKEN;
  if (!token) {
    throw new Error("Scheduler authentication token is missing");
  }
  const client = getSchedulerClient();

  const request: SnapshotRequest = { namespace };

  const metadata = new Metadata();
  metadata.set("authorization", token);

  return new Promise((resolve, reject) => {
    client.makeUnaryRequest<SnapshotRequest, SnapshotResponse>(
      "/SchedulerService/GetSnapshot",
      encodeSnapshotRequest,
      decodeSnapshotResponse,
      request,
      metadata,
      (error: ServiceError | null, response?: SnapshotResponse) => {
        if (error) {
          reject(error);
          return;
        }

        if (!response) {
          reject(new Error("Scheduler returned an empty snapshot response"));
          return;
        }

        resolve(response.snapshot);
      },
    );
  });
}
