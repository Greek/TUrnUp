import axios from "axios";
import { Event_Involved } from "~/types/Event";

export async function getInvolvedEvents(
  limit?: number,
): Promise<Event_Involved[]> {
  return (
    await axios.get<{ value: Event_Involved[] }>(
      "https://involved.towson.edu/api/discovery/event/search?take=9",
    )
  ).data.value;
}

export async function getInvolvedEvent(id: string): Promise<Event_Involved> {
  return (
    await axios.get<Event_Involved>(
      `https://involved.towson.edu/api/discovery/event/${id}`,
    )
  ).data;
}
