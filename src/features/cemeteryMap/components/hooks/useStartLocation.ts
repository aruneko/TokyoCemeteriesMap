import { useCallback, useState } from "react"
import { MarkerDragEvent } from "react-map-gl"
import maplibreGl from "maplibre-gl"

export function useStartLocation() {
  const defaultLocation = new maplibreGl.LngLat(139.71842, 35.72126)
  const [startLocation, setStartLocation] = useState(defaultLocation)

  const setLocation = useCallback((event: MarkerDragEvent) => {
    const {lng, lat} = event.lngLat
    setStartLocation(new maplibreGl.LngLat(lng, lat))
  }, [setStartLocation])

  return { startLocation, setLocation }
}
