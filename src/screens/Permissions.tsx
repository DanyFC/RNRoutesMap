import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PermissionsContext } from '../context/Permissions';
import Button from './../components/Button';

const Permissions = () => {

  const { askLocationPermission } = useContext(PermissionsContext)

  return (
    <View style={styles.container}>

      <Text
        style={styles.text}
      >The use of GPS is necessary for the application.</Text>

      <Button
        onPress={askLocationPermission}
        title='Ask permissions'
      />

    </View>
  )
}
export default Permissions

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Lato-Light',
    fontSize: 20,
    marginBottom: 20,
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
  textDanger: {
    bottom: 10,
    color: '#cc1717',
    fontFamily: 'Lato-Bold',
    position: 'absolute',
  }
})