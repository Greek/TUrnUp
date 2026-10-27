import "server-only";
import { ChannelCredentials, createChannel, createClient } from "nice-grpc";
import { env } from "~/env";
import {
  SchedulerServiceDefinition,
  type SchedulerServiceClient,
} from "~/server/generated/scheduler";

let schedulerClient: SchedulerServiceClient | undefined;

export function getSchedulerClient(): SchedulerServiceClient {
  if (!env.SCHEDULER_GRPC_ADDRESS) {
    throw new Error("Scheduler gRPC configuration is missing");
  }

  const token = env.SCHEDULER_AUTH_TOKEN;
  if (!token) {
    throw new Error("Scheduler authentication token is missing");
  }

  schedulerClient ??= createClient(
    SchedulerServiceDefinition,
    createChannel(env.SCHEDULER_GRPC_ADDRESS, ChannelCredentials.createInsecure()),
  );
  return schedulerClient;
}
