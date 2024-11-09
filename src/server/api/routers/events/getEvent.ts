import axios from "axios";
import { publicProcedure } from "../../trpc";
import z from "zod";
import { EventResult, EventSource, Event_Involved } from "~/types/Event";
import { getInvolvedEvent, getInvolvedEvents } from "~/utils/involved-events";
import { transformEvent } from "~/utils/transform-event";
import { getTUEvent } from "~/utils/tu-events";

export const getEvent = publicProcedure
  .input(
    z.object({
      id: z.string(),
      source: z.enum(["events", "involved"]).optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    let event: EventResult | null | undefined = null;
    if (input.source === EventSource.INVOLVED) {
      event = transformEvent(
        (await getInvolvedEvent(input.id)),
        EventSource.INVOLVED,
      );
    } else {
      const original = await getTUEvent(input.id);
      event = transformEvent(original, EventSource.INVOLVED);
    }

    return event;
  });
