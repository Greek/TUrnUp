import React from "react";
import type { Org_Involved, OrgResult } from "~/types/Organization";
import Image from "next/image";

interface OrgCardProps {
  org: Partial<OrgResult & Org_Involved>;
}

const OrgCard = ({ org }: OrgCardProps) => {
  const handleClick = () => {
    window.open(`${org.originalUrl}`, "_blank");
  };

  if (!org) {
    return null;
  }

  return (
    <div
      onClick={handleClick}
      className="flex h-1/2 transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
    >
      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-center p-4">
        <h2 className="mb-3 text-xl font-bold">{org.name}</h2>
        <p className="mb-2 text-sm text-gray-500">{org.shortName}</p>
        <p className="line-clamp-3 text-sm text-gray-600">{org.summary}</p>
      </div>

      {/* Image Section */}
      <div className="relative flex w-1/3 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#ffffff]/70" />
        {
          <Image
            src={org.profilePicture ?? "/tile.png"}
            alt={`${org.name} profile picture`}
            width={500}
            height={500}
            className="hover:scale-120 max-w-72 transform object-cover transition-transform duration-500 ease-in-out"
          />
        }
      </div>
    </div>
  );
};

export default OrgCard;
