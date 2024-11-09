"use client";

import { Map, View } from "ol"
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';
import { useEffect, useRef } from "react";
import 'ol/ol.css';
import { fromLonLat } from "ol/proj";

export function TU_Map() {
  const position = fromLonLat([-76.6, 39.4]);
  const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!mapRef.current) return;

      const mapObj = new Map({
        view: new View({
          center: position ,
          zoom: 17,
        }),
        layers: [new Tile({ source: new OSM() })],
      });

      mapObj.setTarget(mapRef.current);

      return () => mapObj.setTarget('');
    }, []);

    return <div className ="h-[calc(60vh-4rem)] w-full border-2 border-gray-200 shadow-lg" ref={mapRef} />;}
