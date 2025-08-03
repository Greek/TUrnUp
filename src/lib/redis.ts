/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Redis } from "ioredis";
import { env } from "../env";

let redisInstance: Redis | undefined;

export function createRedisInstance(): Redis {
  if (env.NODE_ENV === "test") {
    throw new Error("Redis should not be created in test environment");
  }

  if (!env.REDIS_URL) {
    throw new Error("Redis URL not defined. Please set the Redis URL.");
  }

  const redis = new Redis(env.REDIS_URL).on("error", (err: Error) => {
    console.warn("Redis connection error:", err);
    redis.disconnect();
  });

  return redis;
}

export function getRedisInstance(): Redis {
  if (!redisInstance) {
    redisInstance = createRedisInstance();
  }
  return redisInstance;
}

export function clearRedisInstance(): void {
  if (redisInstance) {
    redisInstance.disconnect();
    redisInstance = undefined;
  }
}

// For backward compatibility
export const redis =
  env.NODE_ENV === "test" ? undefined : getRedisInstance();

export async function checkForRedisConnection() {
  // Don't check if we're in a test env.
  if (env.NODE_ENV === "test") {
    return;
  }

  const redis = getRedisInstance();

  if (redis.status !== "ready") {
    return;
  }

  try {
    await redis.set("healthcheck", 1);
    await redis.get("healthcheck");
    await redis.del("healthcheck");
  } catch (err: unknown) {
    console.log(
      "Failed to connect to Redis. Please check your connection URL.",
    );
  }
}
