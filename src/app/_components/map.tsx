"use client";

import { Feature, Map, View } from "ol";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";
import { useEffect, useRef } from "react";
import type { EventResult } from "~/types/Event";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import { type Coordinate } from "ol/coordinate";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";

export function TU_Map({ props }: { props?: EventResult[] }) {
  const position = fromLonLat([-76.6106447, 39.39446]);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const events = props ?? [];
    const coordinates: Coordinate[] = events.map((event) => {
      if (!event.long || !event.lat) return position;
      return fromLonLat([event.long, event.lat]);
    });
    const features = coordinates.map((coordinate) => {
      return new Feature({
        geometry: new Point(coordinate),
      });
    });
    const vectorSource = new VectorSource({ features: features });
    const markerLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({
            color: "black",
            width: 1,
          }),
        }),
      }),
    });
    const mapObj = new Map({
      view: new View({
        center: position,
        zoom: 17,
      }),
      layers: [new Tile({ source: new OSM() }), markerLayer],
    });

    mapObj.setTarget(mapRef.current);

    return () => mapObj.setTarget("");
  }, [props, position]);

  return (
    <div
      className="h-[calc(60vh-4rem)] w-full border-2 border-gray-200 shadow-lg"
      ref={mapRef}
    />
  );
}
