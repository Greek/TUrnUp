"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { TU_Map } from "./_components/map";
import { Nav_Bar } from "~/app/_components/navbar";
import EventCard from "~/app/_components/eventcard";

export default function Home() {
  const [displayCount, setDisplayCount] = useState(20);
  const { data: events, isLoading } = api.events.getAllEvents.useQuery();

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 20);
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: 'url("/tile.png")',
        backgroundRepeat: "repeat",
        backgroundSize: "600px",
      }}
    >
      <div className="relative">
        <Nav_Bar />
        <TU_Map />

        <main className="flex flex-col items-center px-4 py-8">
          {isLoading ? (
            <div className="text-center">Loading events...</div>
          ) : (
            <>
              <div className="grid w-[95%] max-w-[620px] grid-cols-2 gap-4">
                {events
                  ?.slice(0, displayCount)
                  .map((event) => (
                    <EventCard
                      key={`${event.event_source}-${event.id}`}
                      event={event}
                      variant={1}
                    />
                  ))}
              </div>

              {events && events.length > displayCount && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="rounded-lg bg-[#ffcc00] px-6 py-2 font-semibold text-black transition-colors hover:bg-[#e6b800]"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
