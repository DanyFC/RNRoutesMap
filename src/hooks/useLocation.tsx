import { useEffect, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';

interface Location {
  latitude: number;
  longitude: number;
}

const useLocation = () => {

  const [hasLocation, setHasLocation] = useState(false)
  const [initLocation, setInitLocation] = useState<Location>({
    latitude: 0,
    longitude: 0
  })

  const getCurrentLocation = () => {
    return new Promise<Location>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })


        },
        (error) => reject(error),
        {
          enableHighAccuracy: true
        }
      )
    })
  }

  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        setInitLocation(location)
        setHasLocation(true)
      })
  }, [])

  return {
    hasLocation,
    initLocation,

    getCurrentLocation
  }
}
export default useLocation