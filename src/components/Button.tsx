import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>
}

const Button = ({ onPress, title, style = {} }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        ...style as any,
        ...styles.button,
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Lato-Black'
  }
})