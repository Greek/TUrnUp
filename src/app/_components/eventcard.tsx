import React from "react";
import type { EventResult } from "~/types/Event";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface EventCardProps {
  event: EventResult;
  variant: 1 | 2;
}

const EventCard = ({ event, variant }: EventCardProps) => {
  const router = useRouter();

  const formatDateTime = (date: Date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleClick = () => {
    router.push(`/events/${event.id}?source=${event.event_source}`);
  };

  if (variant === 1) {
    return (
      <div
        onClick={handleClick}
        className="w-full transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
      >
        {/* Rest of variant 1 content stays the same */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#ffcc00]/70" />
          <Image
            src={event.cover_image || "/api/placeholder/400/320"}
            alt={event.name}
            width={500}
            height={500}
            className="hover:scale-120 h-full w-full transform object-cover transition-transform duration-500 ease-in-out"
          />
        </div>

        <div className="p-4">
          <h2 className="mb-2 line-clamp-2 text-xl font-bold">{event.name}</h2>

          <p className="mb-2 text-sm text-gray-500">
            {formatDateTime(event.start_date)}
          </p>

          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            Located at: {event.location}
          </p>

          <hr className="mb-4 border-t border-gray-200" />

          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">Event Source:</span>
            <span className="ml-2">{event.event_source}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="flex max-h-72 w-full transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
    >
      {/* Rest of variant 2 content stays the same */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="mb-3 line-clamp-2 text-xl font-bold">{event.name}</h2>

          <p className="mb-3 text-sm text-gray-500">
            {formatDateTime(event.start_date)}
          </p>

          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            Located at: {event.location}
          </p>

          <hr className="mb-4 border-t border-gray-200" />

          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">Event Source:</span>
            <span className="ml-2">{event.event_source}</span>
          </div>
        </div>
      </div>

      <div className="relative w-1/2 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#ffcc00]/70" />
        <img
          src={event.cover_image || "/api/placeholder/400/320"}
          alt={event.name}
          className="hover:scale-120 h-full w-full transform object-cover transition-transform duration-500 ease-in-out"
        />
      </div>
    </div>
  );
};

export default EventCard;
