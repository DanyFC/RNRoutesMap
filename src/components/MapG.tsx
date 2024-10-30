import { useEffect, useRef } from 'react';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import useLocation, { Location } from '../hooks/useLocation';
import Loading from '../screens/Loading';
import { MarkerInterface } from '../screens/Map';
import Fab from './Fab';

interface Props {
  markers: MarkerInterface[];
  onLongPress: (coordinate: Location) => void;
}

const MapG = ({ markers, onLongPress }: Props) => {

  const {
    hasLocation,
    initLocation,
    location,

    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation } = useLocation()

  const mapViewRef = useRef<MapView>()
  const following = useRef(true)

  const centerCurrentPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation()

    following.current = true

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
      zoom: 18,
    })
  }

  useEffect(() => {
    followUserLocation()

    return () => {
      stopFollowUserLocation()
    }
  }, [])

  useEffect(() => {
    if (!following.current) return

    const { latitude, longitude } = location

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
      zoom: 18,
    })
  }, [location])

  if (!hasLocation) return <Loading />

  return (
    <>
      <MapView
        ref={(element) => mapViewRef.current = element!}

        style={{ width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        mapType='standard'

        initialRegion={{
          latitude: initLocation.latitude,
          longitude: initLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}

        showsUserLocation
        showsMyLocationButton={false}

        onTouchStart={() => following.current = false}

        onLongPress={({ nativeEvent: { coordinate } }) => onLongPress(coordinate)}
      >
        {markers.map(({ coordinate, description, id, title }) => (
          <Marker
            key={id}
            coordinate={coordinate}
            title={title}
            description={description}
          ></Marker>
        ))}
      </MapView>

      <Fab
        iconName='location'
        onPress={centerCurrentPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  )
}
export default MapG