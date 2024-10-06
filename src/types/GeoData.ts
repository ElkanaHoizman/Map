export interface GeoData {
  type?: string;
  geometry?: Coordinates;
  properties?: Array<Properties>;
}

export interface Properties {
  city?: string;
  country?: string;
  county?: string;
  state?: string;
  zipCode?: string;
}

export interface Coordinates {
  coordinates?: Record<number, number>[];
  type?: string;
}
