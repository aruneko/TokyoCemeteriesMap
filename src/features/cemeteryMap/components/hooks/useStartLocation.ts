import { useCallback, useEffect, useState } from "react"
import { MarkerDragEvent } from "react-map-gl"
import maplibreGl from "maplibre-gl"
import { useUserLocation } from "@/features/states/userLocation"

export function useStartLocation() {
  const defaultLocation = new maplibreGl.LngLat(139.71842, 35.72126)
  const [startLocation, setStartLocation] = useState(defaultLocation)
  const [applied, setApplied] = useState(false)
  const { userLocation } = useUserLocation()

  useEffect(() => {
    // 位置情報が取れた初回だけに、その場所をスタート地点としてセット
    if (userLocation !== undefined && !applied) {
      const [lon, lat] = userLocation.point.coordinates
      const location = new maplibreGl.LngLat(lon, lat)
      const distance = location.distanceTo(defaultLocation)
      if (distance <= 1000) {
        // ただし霊園入口から 1km を超える場合はセットしない
        setStartLocation(location)
      }
      setApplied(true)
    }
  }, [userLocation])

  const setLocation = useCallback((event: MarkerDragEvent) => {
    const {lng, lat} = event.lngLat
    setStartLocation(new maplibreGl.LngLat(lng, lat))
  }, [setStartLocation])

  return { startLocation, setLocation }
}
