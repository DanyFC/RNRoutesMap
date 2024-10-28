import { useEffect, useRef, useState } from 'react';

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
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0
  })

  const watchId = useRef<number>()
  const isMounted = useRef(true)

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

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted) return

        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10
      }
    )
  }

  const stopFollowUserLocation = () => {
    if (watchId.current)
      Geolocation.clearWatch(watchId.current)
  }

  useEffect(() => {

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    getCurrentLocation()
      .then((location) => {
        setInitLocation(location)
        setHasLocation(true)
      })
  }, [])

  return {
    hasLocation,
    initLocation,
    location,

    followUserLocation,
    getCurrentLocation,
    stopFollowUserLocation,
  }
}
export default useLocation