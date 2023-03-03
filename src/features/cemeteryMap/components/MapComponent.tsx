import { FC } from "react";
import { Layer, LayerProps, Map, Source } from "react-map-gl";
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import { useRecoilValue } from "recoil";
import { selectedTombPolygon } from "@/features/states/selectedTombPolygon";

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
    </Map>
  )
}
