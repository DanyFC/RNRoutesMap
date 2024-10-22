import { createStackNavigator } from '@react-navigation/stack';

import Map from '../screens/Map';
import Permissions from '../screens/Permissions';

const StackNavigator = createStackNavigator()

const Stack = () => {
  return (
    <StackNavigator.Navigator>

      <StackNavigator.Screen name='Permissions' component={Permissions} />
      <StackNavigator.Screen name='Map' component={Map} />

    </StackNavigator.Navigator>
  )
}
export default Stack