"use client"
import { api } from "~/trpc/react";
import { TU_Map } from "./_components/map";
export default function Home() {

  return (
    <div id="mapContainer">
      <TU_Map/>
    </div>
  );
}
