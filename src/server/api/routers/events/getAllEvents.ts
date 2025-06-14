import { publicProcedure } from "../../trpc";
import z from "zod";
import { transformEvent } from "~/utils/transform-event";
import { getTUEvents } from "~/utils/tu-events";
import { EventSource } from "~/types/Event";
import type { Event_Involved, EventResult } from "~/types/Event";
import { getInvolvedEvent, getInvolvedEvents } from "~/utils/involved-events";

export const getAllEvents = publicProcedure
  .input(z.object({ limit: z.number() }).optional())
  .query(async ({}) => {
    const initialEventsData = await getTUEvents();
    const initialInvolvedData = await getInvolvedEvents();

    const eventsData = (await Promise.all(
      initialEventsData.events.map(async (entry) =>
        transformEvent(entry.event, EventSource.EVENTS),
      ),
    )) as EventResult[];

    const involvedData = (await Promise.all(
      initialInvolvedData.map(async (entry: Event_Involved) => {
        // getting all involved events won't fetch some critical data,
        // so we'll fetch all individual events and transform them
        // with all the data from the query.
        const event = await getInvolvedEvent(entry.id);
        return transformEvent(event, EventSource.INVOLVED);
      }),
    )) as EventResult[];

    return [...eventsData, ...involvedData];
  });
