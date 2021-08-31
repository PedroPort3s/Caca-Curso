import React,  { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from './src/helpers/ConsumoApi.js';
import styles from './assets/styles/styles';

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

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    teste();
  }, []);

  const teste = async () => 
  {
    try {
      const resposta = await API.MakeRequest('https://reactnative.dev/movies.json','GET');
      console.log(resposta.description);
      setData(resposta.movies);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <View style={styles.basico}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList style={styles.textosBasicos}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text onPress={()=>navigation.navigate('Inicio')}  style={styles.textosBasicos}> Filme: {item.title} Ano: {item.releaseYear}</Text>
          )}
        />
      )}
      <Text style={styles.textosBasicos}>A outra página, clique no grid para voltar ao inicio </Text>
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