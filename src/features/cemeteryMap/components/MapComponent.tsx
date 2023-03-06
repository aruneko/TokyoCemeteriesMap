import { FC } from "react";
import { Layer, LayerProps, Map, Marker, Source } from "react-map-gl";
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import { useRecoilValue } from "recoil";
import { selectedTombPolygon } from "@/features/states/selectedTombPolygon";
import { useStartLocation } from "./hooks/useStartLocation";

export const MapComponent: FC = () => {
  const layerGeoJson = useRecoilValue(selectedTombPolygon)
  const layerStyle: LayerProps = {
    id: 'tombLayer',
    type: 'fill',
    paint: {
      "fill-color": '#ff0000',
      "fill-opacity": 0.8,
    },
  }

  const { startLocation, setLocation } = useStartLocation()

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
      <Marker 
        {...startLocation} 
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
