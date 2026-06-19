// types/location.ts
export interface LocationData {
  id: number;
  name: string;
  count: number;
}

export interface StateGroup {
  id: number;
  stateName: string;
  totalAds: number;
  districts: LocationData[];
}


import rawData from '../data/nigeria_locations.json'; 
export const LOCATION_CONFIG: Record<string, StateGroup> = Object.entries(rawData).reduce((acc, [slug, data], index) => {
  acc[slug] = {
    id: index + 1,
    stateName: data.stateName,
    totalAds: 0, // Initialize with 0 or fetch from your DB
    districts: data.lgas.map((name, lgaIndex) => ({
      id: (index + 1) * 1000 + lgaIndex,
      name: name,
      count: 0 // Initialize with 0 or fetch from your DB
    }))
  };
  return acc;
}, {} as Record<string, StateGroup>);