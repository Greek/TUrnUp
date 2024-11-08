"use client";

import React from "react";
import { eventsRouter } from "~/server/api/routers/events/events";
import { api } from "~/trpc/react";
import { EventResult } from "~/types/Event";

export default function Home() {
  const { isError, data } = api.events.getAllEvents.useQuery();

  return (
    <>
      {isError && <span>Error loading events</span>}
      {data && (
        <span>
          {data?.map((event: EventResult, index: number) => (
            <React.Fragment key={index}>
              {event.name}
              {index < data.length - 1 && ", "}
            </React.Fragment>
          ))}
        </span>
      )}
    </>
  );
}
