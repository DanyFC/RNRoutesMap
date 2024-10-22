import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Map from '../screens/Map';
import Permissions from '../screens/Permissions';

const StackNavigator = createStackNavigator()

const Stack = () => {

  const { top } = useSafeAreaInsets()

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

      <StackNavigator.Screen name='Permissions' component={Permissions} />
      <StackNavigator.Screen name='Map' component={Map} />

    </StackNavigator.Navigator>
  )
}
export default Stack