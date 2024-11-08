import axios from "axios";
import { publicProcedure } from "../../trpc";
import z from "zod";
import { Event, EventResult } from "~/types/Event";

export const getAllEvents = publicProcedure
  .input(z.object({ limit: z.number() }).optional())
  .query(async ({}) => {
    const dataFromEventsTU = (
      await axios.get("https://events.towson.edu/api/2/events")
    ).data.events;

    return await Promise.all(
      dataFromEventsTU.map(async (entry: any) => {
        const { event }: { event: Event } = (
          await axios.get(
            `https://events.towson.edu/api/2/events/${entry.event.id}`,
          )
        ).data;

        return {
          id: event.id,
          name: event.title,
          location: event.location_name,
          geo: event.geo,
          start_date: event.event_instances[0]?.event_instance.start,
          end_date: event.event_instances[0]?.event_instance.end,
        };
      }),
    ) as EventResult[];
  });
