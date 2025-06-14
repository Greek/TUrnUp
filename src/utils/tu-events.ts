import axios from "axios";
import type { Event_TUEvents } from "~/types/Event";

export async function getTUEvents(): Promise<{
  events: { event: Event_TUEvents }[];
}> {
  return {
    events: (
      await axios.get<{ events: { event: Event_TUEvents }[] }>(
        "https://events.towson.edu/api/2/events?days=20",
      )
    ).data.events,
  };
}

export async function getTUEvent(id: string): Promise<Event_TUEvents> {
  return (
    await axios.get<{ event: Event_TUEvents }>(
      `https://events.towson.edu/api/2/events/${id}`,
    )
  ).data.event;
}
