import { publicProcedure } from "../../trpc";
import z from "zod";
import type { EventResult } from "~/types/Event";
import { getRedisInstance } from "~/lib/redis";

export const getAllEvents = publicProcedure
  .input(z.object({ limit: z.number() }).optional())
  .query(async ({}) => {
    const currDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    console.log(currDate);
    const redis = getRedisInstance();
    const dataString = (await redis.get(`snapshot:${currDate}:towson`))!;
    let data: EventResult[];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data = JSON.parse(dataString);
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
