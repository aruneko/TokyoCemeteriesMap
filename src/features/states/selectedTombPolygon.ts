import { selector } from "recoil";
import zoshigayaLayers from '../../layers/zoshigaya.json'
import { selectedTombNumber } from "../tombNumberSelector/states/selectedTombNumber";

export const selectedTombPolygon = selector<GeoJSON.Polygon | undefined>({
  key: 'selectedTombPolygon',
  get: ({get}) => {
    const tombNumber = get(selectedTombNumber)
    const foundLayer = zoshigayaLayers.features.find(
      (feature) => feature.properties.shu === tombNumber.shu && feature.properties.go === tombNumber.go && feature.properties.gawa === tombNumber.gawa
    )?.geometry as GeoJSON.Polygon
    return foundLayer
  }
})
