import { useState } from 'react';
import { View } from 'react-native';

import MapG from '../components/MapG';
import MarkerModal from '../components/MarkerModal';
import { Location } from '../hooks/useLocation';

export interface MarkerInterface {
  id?: string;
  title: string;
  description: string;
  coordinate: Location;
}

const Map = () => {

  const [isVisible, setIsVisible] = useState(false)
  const [markers, setMarkers] = useState<MarkerInterface[]>([])
  const [marker, setMarker] = useState<Location>({
    latitude: 0,
    longitude: 0,
  })

  const showCreateMarkerModal = ({ latitude, longitude }: Location) => {
    console.log('show modal')
    setIsVisible(true)
    setMarker({ latitude, longitude })
  }

  const createMarker = ({ coordinate, description, title }: MarkerInterface) => {
    setMarkers(markers => [...markers, {
      id: (markers.length + 1).toString(),
      title,
      description,
      coordinate
    }])
    setIsVisible(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <MarkerModal
        isVisible={isVisible}
        hideModal={() => setIsVisible(false)}
        onModalSubmit={({ description, title }) => createMarker({
          coordinate: marker,
          description,
          title,
        })}
      />

      <MapG
        markers={markers}
        onLongPress={showCreateMarkerModal}
      />

    </View>
  )
}
export default Map