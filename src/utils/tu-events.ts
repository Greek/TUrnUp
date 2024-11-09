import axios from "axios";

export async function getTUEvents() {
  return await axios.get("https://events.towson.edu/api/2/events");
}

export async function getTUEvent(id: number) {
  return await axios.get(`https://events.towson.edu/api/2/events/${id}`);
}
