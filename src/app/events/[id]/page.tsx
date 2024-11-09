"use client";

import React, { use } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Nav_Bar } from "~/app/_components/navbar";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const router = useRouter();

  const { data: event, isLoading } = api.events.getEvent.useQuery({
    id: resolvedParams.id,
    source: source as "events" | "involved" | undefined,
  });

  const org = api.orgs.getOrganization.useQuery(
    event?.organization_id as number,
  );

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
              {new Date(event.start_date).toDateString()}
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
              <p>View on {event.event_source === "involved" ? <>Involved&#64;TU &rarr;</> : "TU Events"}</p>
            </Button>
          </span>
        </div>

        {/* Organization */}
        {event.event_source === "involved" && (
          <div
            className="mb-8 rounded-lg bg-white p-6 shadow-md"
            onClick={() => router.push(org.data?.originalUrl! as string)}
          >
            <h2 className="mb-4 text-xl font-bold">Organization</h2>
            <div className="flex flex-row items-center">
              {org.data?.profilePicture ? (
                <>
                  <span>
                    <img
                      className="rounded-full border border-neutral-200"
                      src={org.data?.profilePicture}
                      width={128}
                      height={128}
                    />
                  </span>
                </>
              ) : (
                <p>{org.data?.nameSortKey}</p>
              )}
              <span className="ml-4">
                <h3 className="font-semibold">{org?.data?.name}</h3>
                <p className="hidden sm:block text-sm">{org.data?.summary}</p>
              </span>
            </div>
            <hr className="my-4" />
            <span className="flex justify-end">
              <Button
                onClick={() => router.push(event.original_url)}
                variant={"outline"}
              >
                <p>View on Involved&#64;TU &rarr;</p>
              </Button>
            </span>
          </div>
        )}

        {/* Map Placeholder */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Location Map</h2>
          <div className="flex h-[300px] w-full items-center justify-center rounded bg-gray-200">
            <p className="text-gray-500">Map Component Luis</p>
          </div>
        </div>
      </main>
    </div>
  );
}
