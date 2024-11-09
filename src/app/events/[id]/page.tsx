"use client";

import React, { use } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Nav_Bar } from "~/app/_components/navbar";

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const { data: event, isLoading } = api.events.getEvent.useQuery({
    id: resolvedParams.id,
    source: source as "events" | "involved" | undefined,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav_Bar />
        <div className="mt-8 text-center">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav_Bar />
        <div className="mt-8 text-center">Event not found</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: 'url("/tile_events.png")',
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <Nav_Bar />

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Hero Image */}
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
          <img
            src={event.cover_image || "/api/placeholder/400/320"}
            alt={event.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">{event.name}</h1>

          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              <span className="font-medium">Date & Time:</span>{" "}
              {new Date(event.start_date).toDateString()}
            </p>

            <p className="text-lg text-gray-600">
              <span className="font-medium">Location:</span> {event.location}
            </p>

            <p className="text-lg text-gray-600">
              <span className="font-medium">Source:</span> {event.event_source}
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Location Map</h2>
          <div className="flex h-[300px] w-full items-center justify-center rounded bg-gray-200">
            <p className="text-gray-500">Map Component Luis</p>
          </div>
        </div>
      </main>
    </div>
  );
}
