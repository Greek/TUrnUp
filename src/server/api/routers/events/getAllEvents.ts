import { publicProcedure } from "../../trpc";
import z from "zod";
import type { EventResult } from "~/types/Event";
import { TRPCError } from "@trpc/server";
import { getSchedulerSnapshot } from "~/server/schedulerClient";

export const getAllEvents = publicProcedure
  .input(z.object({ limit: z.number() }).optional())
  .query(async () => {
    let snapshot: string;
    try {
      snapshot = await getSchedulerSnapshot("towson");
    } catch (err: unknown) {
      console.error(err);
      throw new TRPCError({
        message: "Failed to get all events",
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    let data: EventResult[] = (
      snapshot ? JSON.parse(snapshot) : []
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
