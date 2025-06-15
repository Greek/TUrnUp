"use client";

import React, { use } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Nav_Bar } from "~/app/_components/navbar";
import { EventMap } from "~/app/_components/map_event";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { EventSource } from "~/types/Event";
import type { OrgResult } from "~/types/Organization";
import Image from "next/image";

interface OrganizationSectionProps {
  org?: OrgResult;
  eventUrl: string;
  router: ReturnType<typeof useRouter>;
}

function OrganizationSection({
  org,
  eventUrl,
  router,
}: OrganizationSectionProps) {
  const imageWrapperClass = "min-h-16 min-w-16 rounded-full border border-neutral-200 object-cover";

  if (!org) return null;

  return (
    <div
      className="mb-8 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-xl font-bold">Organization</h2>
      <div className="flex flex-row items-center">
        {org.profilePicture ? (
          <>
            <span>
              <Image
                className={imageWrapperClass}
                src={org.profilePicture}
                alt={`${org.name} profile picture`}
                width={80}
                height={80}
              />
            </span>
          </>
        ) : (
          <span className={`${imageWrapperClass} flex justify-center items-center`}>
            <p>{org.nameSortKey}</p>
          </span>
        )}
        <span className="ml-4">
          <h3 className="font-semibold text-lg">{org.name}</h3>
          <p className="text-xs sm:text-base sm:block">{org.summary}</p>
        </span>
      </div>
      <hr className="my-4" />
      <span className="flex justify-end">
        <Button onClick={() => router.push(eventUrl)} variant={"outline"}>
          <p>View on Involved&#64;TU &rarr;</p>
        </Button>
      </span>
    </div>
  );
}

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const router = useRouter();

  const { data: event, isLoading: isLoadingEvent } =
    api.events.getEvent.useQuery({
      id: resolvedParams.id,
      source: source as "events" | "involved" | undefined,
    });

  const { data: org } = api.orgs.getOrganization.useQuery(
    event?.organization_id as number,
    {
      enabled: !!event?.organization_id,
    },
  );

  if (isLoadingEvent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mt-8 text-center">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Hero Image */}
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={event.cover_image || "/api/placeholder/400/320"}
            alt={`${event.name} cover image`}
            className="h-full w-full object-cover"
            fill={true}
          />
        </div>

        {/* Event Details */}
        <div className="mb-8 min-h-max rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">{event.name}</h1>

          <hr className="my-4" />

          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              <span
                dangerouslySetInnerHTML={{
                  __html: event.description?.replaceAll(
                    "&nbsp;",
                    " ",
                  ) as TrustedHTML,
                }}
              />
            </p>

            <p className="text-lg text-gray-600">
              <span className="font-medium">Date & Time:</span>{" "}
              {new Date(event.start_date).toDateString()}{" "}
              {new Date(event.start_date).toLocaleTimeString()}
            </p>

            <p className="text-lg text-gray-600">
              <span className="font-medium">Location:</span> {event.location}
            </p>

            <p className="text-lg text-gray-600">
              <span className="font-medium">Source:</span> {event.event_source}
            </p>
          </div>

          <hr className="my-4" />

          <span className="flex justify-end">
            <Button
              onClick={() => router.push(event.original_url)}
              variant={"outline"}
            >
              <p>
                View on{" "}
                {event.event_source === EventSource.INVOLVED ? (
                  <>Involved&#64;TU &rarr;</>
                ) : (
                  "TU Events"
                )}
              </p>
            </Button>
          </span>
        </div>

        {/* Organization */}
        {event.event_source === EventSource.INVOLVED && (
          <OrganizationSection
            org={org}
            eventUrl={event.original_url}
            router={router}
          />
        )}

        {/* Map Placeholder */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Location Map</h2>
          <EventMap props={[event.long, event.lat]}></EventMap>
        </div>
      </main>
    </div>
  );
}
