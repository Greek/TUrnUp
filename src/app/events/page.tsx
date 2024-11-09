"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { Nav_Bar } from "~/app/_components/navbar";
import EventCard from "~/app/_components/eventcard";

export default function EventsPage() {
  const [displayCount, setDisplayCount] = useState(20);
  const { data: events, isLoading } = api.events.getAllEvents.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<
    "all" | "events" | "involved"
  >("all");

  const filteredEvents = events?.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource =
      selectedSource === "all" ||
      event.event_source.toLowerCase() === selectedSource;
    return matchesSearch && matchesSource;
  });

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 20);
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: 'url("/tile.png")',
        backgroundRepeat: "repeat",
        backgroundSize: "650px",
      }}
    >
      <Nav_Bar />

      {/* Search and Filter Section */}
      <div className="mb-8 w-full bg-white p-4 shadow-md">
        <div className="mx-auto flex max-w-[900px] flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#ffcc00] focus:outline-none"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSource("all")}
              className={`rounded-lg px-4 py-2 transition-colors ${
                selectedSource === "all"
                  ? "bg-[#ffcc00] text-black"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedSource("events")}
              className={`rounded-lg px-4 py-2 transition-colors ${
                selectedSource === "events"
                  ? "bg-[#ffcc00] text-black"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Events Towson
            </button>
            <button
              onClick={() => setSelectedSource("involved")}
              className={`rounded-lg px-4 py-2 transition-colors ${
                selectedSource === "involved"
                  ? "bg-[#ffcc00] text-black"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Involved @ TU
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <main className="flex flex-col items-center px-4 py-8">
        {isLoading ? (
          <div className="text-center">Loading events...</div>
        ) : (
          <>
            <div className="flex w-[95%] max-w-[900px] flex-col gap-4">
              {filteredEvents
                ?.slice(0, displayCount)
                .map((event) => (
                  <EventCard
                    key={`${event.event_source}-${event.id}`}
                    event={event}
                    variant={2}
                  />
                ))}
            </div>

            {filteredEvents && filteredEvents.length > displayCount && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-lg bg-[#ffcc00] px-6 py-2 font-semibold text-black transition-colors hover:bg-[#e6b800]"
                >
                  Load More
                </button>
              </div>
            )}

            {filteredEvents?.length === 0 && (
              <div className="text-center text-gray-500">
                No events found matching your criteria
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
