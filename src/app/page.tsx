"use client";

import React from "react";
import { eventsRouter } from "~/server/api/routers/events/events";
import { api } from "~/trpc/react";
import { TU_Map } from "./_components/map";
import { Nav_Bar} from "~/app/_components/navbar";

export default function Home() {

  return (
    <div>
      <Nav_Bar/>
      <TU_Map/>
    </div>
  );
}
