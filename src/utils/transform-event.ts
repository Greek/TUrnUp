import {
  Event_Involved,
  Event_TUEvents,
  EventResult,
  EventSource,
} from "~/types/Event";

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
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      cover_image: `https://se-images.campuslabs.com/clink/images/${event.imagePath}`,
      lat: event.latitude ? Number(event.latitude) : null,
      long: event.longitute ? Number(event.longitute) : null,
      start_date: event.starts_on,
      end_date: event.ends_on,
      event_source: source,
    } as EventResult;
  }
}
