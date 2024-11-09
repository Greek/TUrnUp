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
  location_name: string;
  photo_url: string;
  geo: Geolocation;
  event_instances: EventInstance[];
}

export interface Event_Involved {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  location: string;
  latitude: number;
  longitute: number;
  starts_on: Date;
  ends_on: Date;
  event_instances: EventInstance[];
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
  location: string;
  cover_image: string;
  lat: number;
  long: number;
  start_date: Date;
  end_date: Date;
  event_source: EventSource;
}
