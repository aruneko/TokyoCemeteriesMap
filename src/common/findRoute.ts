import maplibreGl from "maplibre-gl"

type ValhallaLocation = {
  type: string
  lat: number
  lon: number
  original_index: number
}

type ValhallaManeuver = {
  type: number
  instruction: string
  verbal_transition_alert_instruction?: string
  verbal_succinct_transition_instruction?: string
  verbal_pre_transition_instruction?: string
  verbal_post_transition_instruction?: string
  street_names?: Array<string>
  time: number
  length: number
  cost: number
  begin_shape_index: number
  end_shape_index: number
  rough?: boolean
  verbal_multi_cue?: boolean
  travel_mode: string
  travel_type: string
}

type ValhallaLeg = {
  maneuvers: Array<ValhallaManeuver>
  summary: {}
  shape: string
}

type ValhallaRouteResponse = {
  trip: {
    locations: Array<ValhallaLocation>
    legs: Array<ValhallaLeg>
    summary: {}
    status_message: string
    status: number
    units: string
    language: string
  }
}

function decodeRoute(str: string, precision?: number) {
  let index = 0,
      lat = 0,
      lng = 0,
      coordinates = [],
      shift = 0,
      result = 0,
      byte = null,
      latitude_change,
      longitude_change,
      factor = Math.pow(10, precision || 6);

  // Coordinates have variable length when encoded, so just keep
  // track of whether we've hit the end of the string. In each
  // loop iteration, a single coordinate is decoded.
  while (index < str.length) {

      // Reset shift, result, and byte
      byte = null;
      shift = 0;
      result = 0;

      do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
      } while (byte >= 0x20);

      latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      shift = result = 0;

      do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
      } while (byte >= 0x20);

      longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      lat += latitude_change;
      lng += longitude_change;

      coordinates.push([lng / factor, lat / factor]);
  }

  return coordinates;
}

export async function fetchRoute(source: maplibregl.LngLat, destination: GeoJSON.Polygon): Promise<GeoJSON.LineString> {
  const destPoints = destination.coordinates.flat().map(([lng, lat]) => new maplibreGl.LngLat(lng, lat))
  const sorted = destPoints.sort((p1, p2) => source.distanceTo(p1) - source.distanceTo(p2))
  const nearest = sorted[0]
  const payload = {
    locations: [
      { lat: source.lat, lon: source.lng },
      { lat: nearest.lat, lon: nearest.lng },
    ],
    costing: 'pedestrian',
    directions_options: {
      units: 'kilometers',
    },
  }
  const response = await fetch(`https://valhalla1.openstreetmap.de/route?json=${JSON.stringify(payload)}`)
  const result = await response.json() as ValhallaRouteResponse
  const decodedRoute = result.trip.legs.flatMap((leg) => decodeRoute(leg.shape))

  return {
    type: 'LineString',
    coordinates: decodedRoute
  }
}
