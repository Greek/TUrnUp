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
      location: event.location_name,
      cover_image: event.photo_url,
      lat: Number(event.geo?.latitude),
      long: Number(event.geo?.longitude),
      start_date: event.event_instances?.[0]?.event_instance.start ?? null,
      end_date: event.event_instances?.[0]?.event_instance.end ?? null,
      event_source: source,
    } as EventResult;
  }

  if (source === EventSource.INVOLVED) {
    console.log(event.address)
    return {
      id: event.id,
      name: event.name,
      cover_image: `https://se-images.campuslabs.com/clink/images/${event.imagePath}`,
      lat: event.address?.latitude ? Number(event.address.latitude) : null,
      long: event.address?.longitude ? Number(event.address.longitude) : null,
      location: event.address?.location,
      start_date: event.startsOn,
      end_date: event.endsOn,
      event_source: source,
    } as EventResult;
  }
}
