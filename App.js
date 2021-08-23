import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StyleSheet } from 'react-native';

import styles from './assets/styles/styles'

function InicioTela({ navigation }) {
  return (
    <View style={styles.basico}>
      <Text style={styles.textosBasicos}>Página Inicial</Text>
      <Button
        title="Ir para outra página"
        onPress={() => navigation.navigate('Detalhes')}
      />
    </View>
  );
}

function DetalhesTela({ navigation }) {
  return (
    <View style={styles.basico}>
      <Text style={styles.textosBasicos}>A outra página</Text>
      <Button
        title="Voltar Inicio"
        onPress={() => navigation.navigate('Inicio')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioTela} />
        <Stack.Screen name="Detalhes" component={DetalhesTela} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Estilos
// const styles = StyleSheet.create({
//   basico: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#333333',
//   },
//   textosBasicos: {
//     color: 'red',
//     fontSize: 25,
//   }
// })