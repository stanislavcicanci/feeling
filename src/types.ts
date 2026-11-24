export type Language = 'ro' | 'ru' | 'en';

export type LocationFilter = 'all' | 'centru' | 'sectors' | 'with_hours';

export type MenuCategoryId = 'all' | 'espresso' | 'pourover' | 'blended';

export interface OpeningHoursLine {
  daysKey: 'monFri' | 'satSun' | 'monSun';
  hours: string;
}

export interface LocationRecord {
  id: string;
  index: string;
  name: string;
  address: string;
  sector: 'centru' | 'ciocana' | 'riscani' | 'buiucani' | 'telecentru';
  sectorLabel: string;
  city: string;
  landmark?: string;
  coordinates: [number, number]; // [lat, lng]
  openingHours?: OpeningHoursLine[];
  hoursSourceNote?: boolean;
  phone?: string;
  mapsQuery: string;
  mapsUrl: string;
  photo?: string;
}

export interface MenuDrink {
  id: string;
  name: string;
  volume: string;
  category: Exclude<MenuCategoryId, 'all'>;
}
