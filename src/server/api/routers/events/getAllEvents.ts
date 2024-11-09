/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { publicProcedure } from "../../trpc";
import z from "zod";
import { transformEvent } from "~/utils/transform-event";
import { getTUEvents } from "~/utils/tu-events";
import { EventSource } from "~/types/Event";
import type {
  Event_Involved,
  Event_TUEvents,
  EventResult,
} from "~/types/Event";
import { getInvolvedEvents } from "~/utils/involved-events";

export const getAllEvents = publicProcedure
  .input(z.object({ limit: z.number() }).optional())
  .query(async ({}) => {
    const initialEventsData = await getTUEvents();
    const initialInvolvedData = (await getInvolvedEvents(3));

    const eventsData = (await Promise.all(
      initialEventsData.events.map(async (entry) =>
        transformEvent(entry.event, EventSource.EVENTS),
      ),
    )) as EventResult[];

    const involvedData = (await Promise.all(
      initialInvolvedData.map(async (entry: Event_Involved) =>
        transformEvent(entry, EventSource.INVOLVED),
      ),
    )) as EventResult[];

    return [...eventsData, ...involvedData];
  });
