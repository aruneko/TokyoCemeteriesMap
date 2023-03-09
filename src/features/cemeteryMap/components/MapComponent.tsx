import { FC } from "react";
import { Layer, LayerProps, Map, Marker, Source } from "react-map-gl";
import maplibregl from 'maplibre-gl';
import useSWR from 'swr'

import 'maplibre-gl/dist/maplibre-gl.css';
import { useSelectedTombPolygon } from "@/features/states/selectedTombPolygon";
import { useStartLocation } from "./hooks/useStartLocation";
import { fetchRoute } from "@/common/findRoute";

export const MapComponent: FC = () => {
  const { selectedTomb: layerGeoJson } = useSelectedTombPolygon()
  const layerStyle: LayerProps = {
    id: 'tombLayer',
    type: 'fill',
    paint: {
      "fill-color": '#ff0000',
      "fill-opacity": 0.8,
    },
  }

  const lineStyle: LayerProps = {
    id: 'routeLayer',
    type: 'line',
    paint: {
      'line-color': '#ff0000',
    }
  }

  const { startLocation, setLocation } = useStartLocation()
  const { data: routePolygon } = useSWR(
    () => layerGeoJson ? [startLocation, layerGeoJson] : null,
    ([source, destination]) => fetchRoute(source, destination)
  )

  return (
    <Map
      style={{ width: '100%', height: '100vh' }}
      initialViewState={{
        latitude: 35.72272,
        longitude: 139.71986,
        zoom: 17,
      }}
      mapLib={maplibregl}
      mapStyle="https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json"
    >
      { layerGeoJson && 
        <Source id='tombPolygon' type="geojson" data={layerGeoJson}>
          <Layer {...layerStyle} />
        </Source>
      }
      { routePolygon &&
        <Source id='routePolygon' type="geojson" data={routePolygon}>
          <Layer {...lineStyle} />
        </Source>
      }
      <Marker 
        longitude={startLocation.lng}
        latitude={startLocation.lat}
        draggable={true} 
        onDragEnd={setLocation} 
        offset={[20, -20]}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-12 h-12"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
          />
        </svg>
      </Marker>
    </Map>
  )
}
