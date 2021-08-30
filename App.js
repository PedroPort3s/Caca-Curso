import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Inicio" screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused
                ? 'home' : 'home-outline';
            } else if (route.name === 'Detalhes') {
              iconName = focused ? 'ellipsis-vertical' : 'ellipsis-vertical-outline';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00FFC1',
          tabBarInactiveTintColor: '#00418F',
        })}
        >
        <Tab.Screen name="Inicio" component={InicioTela} />
        <Tab.Screen name="Detalhes" component={DetalhesTela} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;