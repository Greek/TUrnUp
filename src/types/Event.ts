export interface Event {
  id: string;
  title: string;
  location_name: string;
  geo: unknown;
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
  geo: string;
  start_date: Date;
  end_date: Date;
}
