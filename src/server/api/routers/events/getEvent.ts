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
  .query(async ({ input }) => {
    let event: EventResult | null | undefined = null;
    if (input.source === "involved") {
      event = transformEvent(
        await getInvolvedEvent(input.id),
        EventSource.INVOLVED,
      );
    } else {
      event = transformEvent(await getTUEvent(input.id), EventSource.EVENTS);
    }

    console.log(event);
    return event;
  });
