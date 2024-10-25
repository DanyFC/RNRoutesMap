import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { PermissionsContext } from '../context/Permissions';

const Permissions = () => {

  const { permissions, askLocationPermission, checkLocationPermission } = useContext(PermissionsContext)

  return (
    <View style={styles.container}>

      <Text
        style={{ fontSize: 30, fontFamily: 'Lato-Regular' }}
      >Permissions screen - {JSON.stringify(permissions, null, 4)}</Text>

      <Button title='Ask permission' onPress={askLocationPermission} />

    </View>
  )
}
export default Permissions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})