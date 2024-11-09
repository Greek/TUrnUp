"use client";

import { Feature, Map, View } from "ol";
import { Point } from "ol/geom";
import { Tile } from 'ol/layer';
import VectorLayer from "ol/layer/Vector";
import 'ol/ol.css';
import { fromLonLat } from "ol/proj";
import { OSM } from 'ol/source';
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { useEffect, useRef } from "react";

export function EventMap({ props }: { props?: number[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const event_coordinate = props && props.length === 2 ? props : [-76.6106447, 39.39446];
    const coordinates = fromLonLat(event_coordinate);
    const feature =  new Feature({
        geometry: new Point(coordinates),
    })
    const vectorSource = new VectorSource({ features: [feature] });
    const markerLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({
            color: 'black',
            width: 1,
          }),
        }),
      }),
    });
    const mapObj = new Map({
      view: new View({
        center: coordinates,
        zoom: 18,
      }),
      layers: [
        new Tile({ source: new OSM() }),
        markerLayer
      ],
    });

    mapObj.setTarget(mapRef.current);

    return () => mapObj.setTarget('');
  }, [props]);

  return <div className="flex h-[300px] w-full items-center justify-center rounded bg-gray-200" ref={mapRef} />;
}
