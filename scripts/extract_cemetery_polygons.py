import json
import textwrap
import urllib.parse
import urllib.request


def download_cemetery_polygons() -> dict:
    overpass_api_base_url = "http://overpass-api.de/api/interpreter?data="
    raw_query = '''\
    [out:json][timeout:25];
    way["landuse"="cemetery"](35.7211, 139.7173, 35.7242, 139.7231);
    out geom;
    out skel qt;
    '''
    flatten_query = "".join(textwrap.dedent(raw_query).split("\n"))
    encoded_query = urllib.parse.quote(flatten_query)
    with urllib.request.urlopen(overpass_api_base_url + encoded_query) as response:
        contents = response.read()
        return json.loads(contents)


def is_cemetery_polygon(d: dict) -> bool:
    if d.get("type") != "way":
        return False

    if d.get("tags") is None:
        return False
    
    tags = d.get("tags")

    if tags.get("側") is None:
        return False
    if tags.get("号") is None:
        return False
    if tags.get("種") is None:
        return False
    
    return True


def make_polygon(coordinates: list[list[float, float]]) -> dict:
    return {
        "type": "Polygon",
        "coordinates": [coordinates],
    }


def make_polygon_feature(polygon: dict) -> dict:
    coordinates = [[point["lon"], point["lat"]] for point in polygon["geometry"]]
    tags = polygon["tags"]

    return {
        "type": "Feature",
        "geometry": make_polygon(coordinates),
        "properties": {
            "shu": int(tags.get("種")),
            "go": tags.get("号"),
            "gawa": int(tags.get("側")),
        },
    }


def make_feature_collection(features: list[dict]) -> dict:
    return {
        "type": "FeatureCollection",
        "features": features,
    }


def save_geojson_file(filename: str, feture_collection: dict) -> None:
    with open(filename, 'w') as geojson_file:
        json.dump(feture_collection, geojson_file, indent=2)


def main() -> None:
    parsed_json = download_cemetery_polygons()
    elements = parsed_json["elements"]
    extracted_polygons = [e for e in elements if is_cemetery_polygon(e)]
    features = [make_polygon_feature(polygon) for polygon in extracted_polygons]
    feature_collection = make_feature_collection(features)
    save_geojson_file("zoshigaya.json", feature_collection)


if __name__ == '__main__':
    main()
