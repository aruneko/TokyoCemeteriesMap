import { useCallback, useState } from "react"
import { MarkerDragEvent } from "react-map-gl"

export function useStartLocation() {
  const defaultLocation = { latitude: 35.72126, longitude: 139.71842 }
  const [startLocation, setStartLocation] = useState(defaultLocation)

  const setLocation = useCallback((event: MarkerDragEvent) => {
    const {lng, lat} = event.lngLat
    setStartLocation({ latitude: lat, longitude: lng })
  }, [setStartLocation])

  return { startLocation, setLocation }
}