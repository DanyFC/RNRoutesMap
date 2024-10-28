import Entypo from '@expo/vector-icons/Entypo';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;

}

const Fab = ({ iconName, onPress, style = {} }: Props) => {
  return (
    <View style={{ ...style as any }}>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.fabButton}
      >
        <Entypo name={iconName as any} color='#fff' size={25} />
      </TouchableOpacity>

    </View>
  )
}
export default Fab

const styles = StyleSheet.create({
  fabButton: {
    backgroundColor: '#333',
    height: 50,
    width: 50,
    zIndex: 999,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  }
})