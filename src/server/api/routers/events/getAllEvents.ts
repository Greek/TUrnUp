import { publicProcedure } from "../../trpc";
import z from "zod";
import {
  transformInvolvedEvent,
  transformTUEvent,
} from "~/utils/transform-event";
import { getTUEvents } from "~/utils/tu-events";
import type { Event_Involved } from "~/types/Event";
import { getInvolvedEvent, getInvolvedEvents } from "~/utils/involved-events";

export const getAllEvents = publicProcedure
  .input(z.object({ limit: z.number() }).optional())
  .query(async ({}) => {
    const initialEventsData = await getTUEvents();
    const initialInvolvedData = await getInvolvedEvents();

    const eventsData = await Promise.all(
      initialEventsData.events.map(async (entry) =>
        transformTUEvent(entry.event),
      ),
    );

    const involvedData = await Promise.all(
      initialInvolvedData.map(async (entry: Event_Involved) => {
        // getting all involved events won't fetch some critical data,
        // so we'll fetch all individual events and transform them
        // with all the data from the query.
        const event = await getInvolvedEvent(entry.id);
        return transformInvolvedEvent(event);
      }),
    );

    const finalData = [...involvedData, ...eventsData]
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

    return finalData;
  });
