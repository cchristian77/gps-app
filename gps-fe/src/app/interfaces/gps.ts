export interface GpsIndex {
  id: string,
  device_id: string
  device_type: string
  latest_timestamp?: string;
  latest_location: string
}

export interface GpsLocation {
  name: string,
  timestamps: string[],
  duration: number,
  percentage: number
}

export interface GpsDetail {
  id: string,
  device_id: string
  device_type: string
  locations: GpsLocation[]
}
