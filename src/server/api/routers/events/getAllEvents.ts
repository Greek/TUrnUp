import { publicProcedure } from "../../trpc";
import z from "zod";
import type { EventResult } from "~/types/Event";
import { getRedisInstance } from "~/lib/redis";
import { TRPCError } from "@trpc/server";

export const getAllEvents = publicProcedure
  .input(z.object({ limit: z.number() }).optional())
  .query(async ({}) => {
    const currDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const redis = getRedisInstance();

    let redisValue: string;
    try {
      redisValue = (await redis.get(`snapshot:${currDate}:towson`)) ?? "";
    } catch (err: unknown) {
      console.error(err);
      throw new TRPCError({
        message: "Failed to get all events",
        code: "NOT_FOUND",
      });
    }

    let data: EventResult[] = (
      redisValue ? JSON.parse(redisValue) : []
    ) as EventResult[];

    data = data
      .filter(
        (e) =>
          e.start_date &&
          new Date(e.start_date).getFullYear() === new Date().getFullYear(),
      )
      .sort((a, b) => {
        if (a.start_date && b.start_date)
          return (
            Number(new Date(a.start_date)) - Number(new Date(b.start_date))
          );
        else return -1;
      });

    return data;
  });
