import axios from "axios";
import type { Event_Involved } from "~/types/Event";
import type { Org_Involved } from "~/types/Organization";

export async function getInvolvedEvents(limit = 15): Promise<Event_Involved[]> {
  return (
    await axios.get<{ value: Event_Involved[] }>(
      `https://involved.towson.edu/api/discovery/event/search?take=${limit}`,
    )
  ).data.value;
}

export async function getInvolvedEvent(
  id: string | number,
): Promise<Event_Involved> {
  return (
    await axios.get<Event_Involved>(
      `https://involved.towson.edu/api/discovery/event/${id}`,
    )
  ).data;
}

export async function getInvolvedOrgs(): Promise<Org_Involved[]> {
  return (
    await axios.get<{ items: Org_Involved[] }>(
      `https://involved.towson.edu/api/discovery/organization`,
    )
  ).data.items;
}

export async function getInvolvedOrg(
  id: string | number,
): Promise<Org_Involved> {
  return (
    await axios.get<Org_Involved>(
      `https://involved.towson.edu/api/discovery/organization/${id}`,
    )
  ).data;
}
