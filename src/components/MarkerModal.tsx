import { useEffect, useState } from 'react';
import { Button, Modal as RModal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface MarkerInfo {
  description: string;
  title: string;
}

interface Props {
  visible: boolean;
  onModalSubmit: ({ description, title }: MarkerInfo) => void;
}

const MarkerModal = ({ visible, onModalSubmit }: Props) => {
  
  const [isVisible, setIsVisible] = useState(visible)
  const [markerInfo, setMarkerInfo] = useState<MarkerInfo>({
    description: '',
    title: '',
  })

  const hideModal = () => setIsVisible(false)

  const onChange = (value: string, field: keyof MarkerInfo) => {
    setMarkerInfo({ ...markerInfo, [field]: value })
  }

  const onSubmitModal = () => {
    if (markerInfo.description.length === 0 || markerInfo.title.length === 0) return

    onModalSubmit(markerInfo)
    hideModal()
  }

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  return (
    <View style={styles.container}>

      <RModal
        animationType='fade'
        visible={isVisible}
        transparent={true}
        onRequestClose={hideModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPressOut={hideModal} activeOpacity={1}>

          <TouchableWithoutFeedback>
            <View style={{ ...styles.modalWindow }}>
              <Text style={{ ...styles.modalHeader }}>Create a mark</Text>

              <View>
                <Text style={{ ...styles.modalText }}>Title: </Text>
                <TextInput
                  autoCapitalize='sentences'
                  onChangeText={(value) => onChange(value, 'title')}
                  placeholder='Enter title'
                  style={styles.modalInput}
                />
              </View>

              <View>
                <Text style={{ ...styles.modalText }}>Description: </Text>
                <TextInput
                  autoCapitalize='sentences'
                  onChangeText={(value) => onChange(value, 'description')}
                  placeholder='Enter description'
                  style={styles.modalInput}
                />
              </View>

              <Button title='Create' onPress={onSubmitModal} />

            </View>
          </TouchableWithoutFeedback>

        </TouchableOpacity>
      </RModal>
    </View>
  )
}
export default MarkerModal

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#0000001d',
    flex: 1,
    justifyContent: 'center',
  },
  modalWindow: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 10,
    gap: 25,
    justifyContent: 'space-between',
    padding: 20,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modalText: {
    fontSize: 20,
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
})