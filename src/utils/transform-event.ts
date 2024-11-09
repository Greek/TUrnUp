import type {
  Event_Involved,
  Event_TUEvents,
  EventResult,
} from "~/types/Event";

import { EventSource } from "~/types/Event";

export function transformEvent(
  event: Partial<Event_TUEvents & Event_Involved>,
  source: EventSource,
) {
  if (source === EventSource.EVENTS) {
    return {
      id: event.id,
      name: event.title,
      description: event.description,
      original_url: `https://events.towson.edu/event/${event.urlname}`,
      location: event.location_name,
      cover_image: event.photo_url,
      lat: event.geo?.latitude ? Number(event.geo.latitude) : null,
      long: event.geo?.longitude ? Number(event.geo.longitude) : null,
      start_date: event.event_instances?.[0]?.event_instance.start ?? null,
      end_date: event.event_instances?.[0]?.event_instance.end ?? null,
      event_source: source,
    } as EventResult;
  }

  if (source === EventSource.INVOLVED) {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      original_url: `https://involved.towson.edu/event/${event.id}`,
      cover_image: `https://se-images.campuslabs.com/clink/images/${event.imagePath}`,
      lat: event.address?.latitude ? Number(event.address.latitude) : null,
      long: event.address?.longitude ? Number(event.address.longitude) : null,
      location: event.address?.location ?? event.address?.name,
      start_date: event.startsOn,
      end_date: event.endsOn,
      event_source: source,
    } as EventResult;
  }
}
