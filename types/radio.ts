export interface RadioStation {
  stationuuid: string
  name: string
  url: string
  url_resolved: string
  homepage: string
  favicon: string
  tags: string
  country: string
  countrycode: string
  state: string
  language: string
  votes: number
  lastchangetime: string
  codec: string
  bitrate: number
  hls: number
  lastcheckok: number
  lastchecktime: string
  lastcheckoktime: string
  lastlocalchecktime: string
  clicktimestamp: string
  clickcount: number
  clicktrend: number
  ssl_error: number
  geo_lat: number
  geo_long: number
}

export interface ProcessedStation {
  id: string
  name: string
  url: string
  genre: string
  location: string
  country: string
  language: string
  bitrate: number
  codec: string
  votes: number
  favicon: string
  isLive: boolean
  lastChecked: string
  homepage: string
  tags: string[]
  clickcount: number
  geo_lat: number
  geo_long: number
}

export interface StationCategory {
  id: string
  name: string
  icon: string
  count: number
  color: string
}

export interface RecentlyPlayed {
  station: ProcessedStation
  playedAt: number
  duration: number
}

export interface UserPreferences {
  theme: "dark" | "light" | "auto"
  language: "sw" | "en"
  autoPlay: boolean
  notifications: boolean
  quality: "low" | "medium" | "high"
  volume: number
  equalizer: EqualizerSettings
}

export interface EqualizerSettings {
  enabled: boolean
  preset: string
  bands: number[]
}

export interface Playlist {
  id: string
  name: string
  stations: string[]
  createdAt: number
  updatedAt: number
  isPublic: boolean
}

export interface StationStats {
  totalListeners: number
  peakListeners: number
  averageRating: number
  totalRatings: number
  uptime: number
}
