import { StyleSheet, View } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { useEffect, useRef, useState } from 'react';
import Fab from '../components/Fab';
import MarkerModal from '../components/MarkerModal';
import useLocation, { Location } from '../hooks/useLocation';
import Loading from './Loading';

const Map = () => {

  const {
    hasLocation,
    initLocation,
    location,
    markers,

    createMarker,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation } = useLocation()

  const mapViewRef = useRef<MapView>()
  const following = useRef(true)

  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [marker, setMarker] = useState<Location>({
    latitude: 0,
    longitude: 0,
  })

  const centerCurrentPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation()

    following.current = true

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
      zoom: 18,
    })
  }

  const showCreateMarkerModal = ({ latitude, longitude }: Location) => {
    setIsVisibleModal(true)
    setMarker({ latitude, longitude })
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
    <View style={styles.container}>
      <MarkerModal
        visible={isVisibleModal}
        onModalSubmit={({description, title}) => createMarker({
          coordinate: marker,
          description,
          id: (markers.length + 1).toString(),
          title,
        })}
      />

      <MapView
        ref={(element) => mapViewRef.current = element!}

        style={styles.map}
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

        onLongPress={({ nativeEvent: { coordinate } }) => showCreateMarkerModal(coordinate)}
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
    </View>
  )
}
export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});