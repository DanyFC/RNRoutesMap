import { StyleSheet, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { useRef } from 'react';
import Fab from '../components/Fab';
import useLocation from '../hooks/useLocation';
import Loading from './Loading';

const Map = () => {

  const { getCurrentLocation, hasLocation, initLocation } = useLocation()
  const mapViewRef = useRef<MapView>()

  const centerCurrentPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation()

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
      zoom: 18,
    })
  }

  if (!hasLocation) return <Loading />

  return (
    <View style={styles.container}>
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
      />

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