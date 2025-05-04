/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEOADMIN_BASE: string;
  readonly VITE_DRONE_LAYER: string;
  readonly VITE_POP_LAYER: string;
  readonly VITE_LANG: string;
  readonly VITE_TOLERANCE: string;
  readonly VITE_RETURN_GEOMETRY: string;
  readonly VITE_SRID: string;
  readonly VITE_LOCATIONS_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}