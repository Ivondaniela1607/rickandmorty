export interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  residentOrigen: string;
  residentLocation: string;
  nameEpisode: string;
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface LocationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationsResponse {
  info: LocationInfo;
  results: Location[];
}

export interface EpisodeInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; 
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodesResponse {
  info: EpisodeInfo;
  results: Episode[];
}
