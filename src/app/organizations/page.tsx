"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import OrgCard from "~/app/_components/orgcard";
import type { Org_Involved } from "~/types/Organization";

export default function OrganizationsPage() {
  const [displayCount, setDisplayCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: organizations, isLoading } =
    api.orgs.getOrganizations.useQuery() as {
      data: Org_Involved[] | undefined;
      isLoading: boolean;
    };

  const filteredOrgs = organizations?.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.summary.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  // Helper function to safely generate keys
  const generateKey = (org: Org_Involved) => {
    if (!org.id) return Math.random().toString();
    return org.id.toString();
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
      {/* Search Section */}
      <div className="mb-8 w-full bg-white p-4 shadow-md">
        <div className="mx-auto max-w-[900px]">
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#ffcc00] focus:outline-none"
          />
        </div>
      </div>

      {/* Organizations List */}
      <main className="flex flex-col items-center px-4 py-8">
        {isLoading ? (
          <div className="text-center">Loading organizations...</div>
        ) : (
          <>
            <div className="flex w-[95%] max-w-[900px] flex-col gap-4">
              {filteredOrgs
                ?.slice(0, displayCount)
                .map((org) => <OrgCard key={generateKey(org) + (Math.random() * 20)} org={org} />)}
            </div>

            {filteredOrgs && filteredOrgs.length > displayCount && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-lg bg-[#ffcc00] px-6 py-2 font-semibold text-black transition-colors hover:bg-[#e6b800]"
                >
                  Load More
                </button>
              </div>
            )}

            {filteredOrgs?.length === 0 && (
              <div className="text-center text-gray-500">
                No organizations found matching your search
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
