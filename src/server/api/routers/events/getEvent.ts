import { publicProcedure } from "../../trpc";
import z from "zod";
import { type EventResult } from "~/types/Event";
import { getInvolvedEvent } from "~/utils/involved-events";
import {
  transformInvolvedEvent,
  transformTUEvent,
} from "~/utils/transform-event";
import { getTUEvent } from "~/utils/tu-events";

export const getEvent = publicProcedure
  .input(
    z.object({
      id: z.string(),
      source: z.enum(["events", "involved"]).optional(),
    }),
  )
  .query(async ({ input }) => {
    let event: EventResult | null | undefined = null;
    if (input.source === "involved") {
      event = transformInvolvedEvent(await getInvolvedEvent(input.id));
    } else {
      event = transformTUEvent(await getTUEvent(input.id));
    }

    return event;
  });
