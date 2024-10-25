import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={70}  color='#0000ff' />

      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}
export default Loading

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    marginTop: 10,
  }
})