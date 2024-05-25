import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CurrencyConveter from './src/components/currency-converter';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CurrencyConveter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#fff'
  },
});
