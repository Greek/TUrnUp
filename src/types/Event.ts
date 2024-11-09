export interface Geolocation {
  latitude: number;
  longitude: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

export enum EventSource {
  INVOLVED = "involved",
  EVENTS = "events",
}

export interface Event_TUEvents {
  id: number;
  title: string;
  description: string;
  urlname: string;
  photo_url: string;
  geo: Geolocation;
  location_name: string;
  event_instances: EventInstance[];
}

export interface Event_Involved {
  id: number;
  name: string;
  description: string;
  organizationId: string;
  imagePath: string;
  imageUrl?: string;
  address: {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
  };
  startsOn: Date;
  endsOn: Date;
}

export interface EventInstance {
  event_instance: {
    start: Date;
    end: Date;
  };
}

export interface EventResult {
  id: number;
  name: string;
  description?: string;
  original_url: string;
  organization_id?: number | string;
  location: string;
  cover_image: string;
  lat: number;
  long: number;
  start_date: Date;
  end_date: Date;
  event_source: EventSource;
}
