import axios from "axios";
import { Event_Involved } from "~/types/Event";

export async function getInvolvedEvents(limit: number) {
  return await axios.get(
    "https://involved.towson.edu/api/discovery/event/search?take=9",
  );
}
