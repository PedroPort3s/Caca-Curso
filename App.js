import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import CursosNavigation from './navigation/CursosNavigation';

function App() {
  return (
    // <View style={styles.tela}>
    //   <Text>Testando</Text>
    // </View>
    <CursosNavigation />
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;