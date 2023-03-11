import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";

type LocationState = {
  point: GeoJSON.Point
  accuracy: number
}

const userLocationState = atom<LocationState | undefined>({
  key: 'userLocationState',
  default: undefined,
})

export function useUserLocation() {
  const [userLocation, setUserLocation] = useRecoilState(userLocationState)

  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude, accuracy } = position.coords
      const point = {
        type: 'Point',
        coordinates: [longitude, latitude]
      } satisfies GeoJSON.Point
      console.log(position.coords)
      setUserLocation({
        point,
        accuracy: accuracy / 200,
      })
    })

    return function cleanUp() {
      navigator.geolocation.clearWatch(watcher)
    }
  }, [setUserLocation])

  return { userLocation }
}
