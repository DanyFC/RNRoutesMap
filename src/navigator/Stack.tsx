import { useContext } from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PermissionsContext } from '../context/Permissions';
import Loading from '../screens/Loading';
import Map from '../screens/Map';
import Permissions from '../screens/Permissions';

const StackNavigator = createStackNavigator()

const Stack = () => {

  const { top } = useSafeAreaInsets()
  const { permissions } = useContext(PermissionsContext)

  if (permissions.locationStatus === 'unavailable') {
    return (
      <View style={{
        flex: 1,
        marginTop: top,
        backgroundColor: '#fff'
      }}>
        <Loading />
      </View>
    )
  }

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          paddingTop: top,
          backgroundColor: '#ffffff'
        }
      }}
    >
      {
        permissions.locationStatus === 'granted'
          ? (<StackNavigator.Screen name='Map' component={Map} />)
          : (<StackNavigator.Screen name='Permissions' component={Permissions} />)
      }
    </StackNavigator.Navigator>
  )
}
export default Stack