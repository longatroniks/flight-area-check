import { DroneRestriction, PopulationStat } from "../../assets/types";

const BASE_URL = import.meta.env.VITE_GEOADMIN_BASE!;
const DRONE_LAYER = import.meta.env.VITE_DRONE_LAYER!;
const POP_LAYER = import.meta.env.VITE_POP_LAYER!;
const LANG = import.meta.env.VITE_LANG!;
const TOLERANCE = import.meta.env.VITE_TOLERANCE!;
const RETURN_GEOMETRY = import.meta.env.VITE_RETURN_GEOMETRY!;
const SRID = import.meta.env.VITE_SRID!;

const buildGeoUrl = (layer: string, lat: number, lon: number): string => {
  const params = new URLSearchParams({
    layers: `all:${layer}`,
    geometryType: "esriGeometryPoint",
    sr: SRID,
    lang: LANG,
    returnGeometry: RETURN_GEOMETRY,
    tolerance: TOLERANCE,
    geometry: JSON.stringify({ x: lon, y: lat }),
  });

  return `${BASE_URL}?${params.toString()}`;
};

export const fetchDroneRestrictions = async (
  lat: number,
  lon: number
): Promise<DroneRestriction[]> => {
  const res = await fetch(buildGeoUrl(DRONE_LAYER, lat, lon));
  if (!res.ok) throw new Error("Failed to fetch drone restrictions");
  const data = await res.json();

  return data.results.map((result: any): DroneRestriction => {
    const a = result.attributes;
    return {
      id: result.id,
      name: a.zone_name_en,
      restriction: a.zone_restriction_en,
      message: a.zone_message_en,
      restrictionId: a.zone_restriction_id,
      authority: {
        name: a.auth_name_en?.[0] ?? "",
        service: a.auth_service_en?.[0] ?? "",
        email: a.auth_email?.[0],
        phone: a.auth_phone?.[0],
        url: a.auth_url_en?.[0],
      },
      lowerLimit: a.air_vol_lower_limit,
      upperLimit: a.air_vol_upper_limit,
    };
  });
};

export const fetchPopulationDensity = async (
  lat: number,
  lon: number
): Promise<PopulationStat[]> => {
  const res = await fetch(buildGeoUrl(POP_LAYER, lat, lon));
  if (!res.ok) throw new Error("Failed to fetch population density");
  const data = await res.json();

  return data.results
    .map((result: any): PopulationStat => ({
      year: result.attributes.i_year,
      value: result.attributes.number,
    }))
    .sort((a: PopulationStat, b: PopulationStat) => b.year - a.year);
};

