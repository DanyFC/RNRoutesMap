import Entypo from '@expo/vector-icons/Entypo';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props {
  active?: boolean;
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Fab = ({ active = false, iconName, onPress, style = {} }: Props) => {
  return (
    <View style={{ ...style as any }}>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.fabButton}
      >
        <Entypo name={iconName as any} color='#fff' size={25} />
      </TouchableOpacity>

    </View >
  )
}
export default Fab

const styles = StyleSheet.create({
  fabButton: {
    alignItems: 'center',
    backgroundColor: '#c22929',
    borderRadius: 100,
    elevation: 6,
    height: 50,
    justifyContent: 'center',
    width: 50,
    zIndex: 999,
  }
})