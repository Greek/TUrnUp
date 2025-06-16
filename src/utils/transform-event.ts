import type {
  Event_Involved,
  Event_TUEvents,
  EventResult,
} from "~/types/Event";

import { EventSource } from "~/types/Event";
import type { Org_Involved } from "~/types/Organization";

export function transformOrg(org: Org_Involved) {
  return {
    name: org.name,
    shortName: org.shortName,
    nameSortKey: org.nameSortKey,
    originalUrl: `https://involved.towson.edu/organization/${org.websiteKey}`,
    summary: org.summary,
    profilePicture: org.profilePicture
      ? `https://se-images.campuslabs.com/clink/images/${org.profilePicture}`
      : null,
  };
}

export function transformTUEvent(event: Event_TUEvents) {
  return {
    id: event.id,
    name: event.title,
    description: event.description,
    original_url: `https://events.towson.edu/event/${event.urlname}`,
    location: event.location_name,
    cover_image: event.photo_url,
    lat: event.geo?.latitude ? Number(event.geo.latitude) : null,
    long: event.geo?.longitude ? Number(event.geo.longitude) : null,
    start_date: event.event_instances[0]!.event_instance.start,
    end_date: event.event_instances[0]!.event_instance.end,
    event_source: EventSource.EVENTS,
  };
}

export function transformInvolvedEvent(event: Event_Involved): EventResult {
  return {
    id: event.id,
    name: event.name,
    description: event.description,
    organization_id: event.organizationId,
    original_url: `https://involved.towson.edu/event/${event.id}`,
    cover_image: event.imagePath
      ? `https://se-images.campuslabs.com/clink/images/${event.imagePath}`
      : event.imageUrl,
    lat: event.address?.latitude ? Number(event.address.latitude) : null,
    long: event.address?.longitude ? Number(event.address.longitude) : null,
    location: event.address?.location ?? event.address?.name,
    start_date: event.startsOn,
    end_date: event.endsOn,
    event_source: EventSource.INVOLVED,
  };
}
