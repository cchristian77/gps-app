const gpsIndexDTO = (gps) => ({
  device_id: gps.code,
  device_type: gps.deviceType.name,
  latest_timestamp: gps.locations.length > 0 ? gps.locations[0].timestamp : null,
  latest_location: gps.locations.length > 0 ? gps.locations[0].location.name : null
})

const getGpsIndexResponseDTO = (gpses, pagination) => ({
  data: gpses.map(gpsIndexDTO),
  pagination: pagination
})

const getGPSDetailResponseDTO = (gps) => {
  let locations = gps.locations.map((el) => ({
    name: el.location.name,
    timestamp: el.timestamp,
    latitude: el.location.latitude,
    longitude: el.location.longitude,
  }))

  let totalDuration = 0
  const groupedLocations = Object.entries(
    locations.reduce((location, {name, timestamp}) => {
      // Group initialization
      if (!location[name]) {
        location[name] = []
      }

      location[name].push(timestamp)

      totalDuration += 1

      return location
    }, {})
  ).map(([location, timestamps]) => ({location, timestamps}))

  totalDuration *= 5
  return {
    uuid: gps.uuid,
    device_id: gps.code,
    device_type: gps.deviceType.name,
    locations: groupedLocations.map((location) => {
      // calculate duration based on each locations' timestamp entries times 5 minutes
      const duration = location.timestamps.length * 5

      return {
        name: location.location,
        timestamps: location.timestamps,
        duration: duration,
        percentage: duration / totalDuration * 100,
      }
    })
  }
}

export {
  getGpsIndexResponseDTO,
  getGPSDetailResponseDTO
}