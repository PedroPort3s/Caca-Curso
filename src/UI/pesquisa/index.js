import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, View, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../helpers/ConsumoApi';
import styles from './style';

export function PesquisaTela({ navigation }) {
    return (
        <View style={styles.basico}>
            <Text style={styles.textosBasicos}>Inicio</Text>
            {/* <Button
                title="Ir para outra página"
                onPress={() => navigation.navigate('Detalhes')}
            /> */}
            {/* <TextInput style={styles.textInput} /> */}

        </View>
    );
}
export function FavoritosTela({ navigation }) {
    return (
        <View style={styles.basico}>
            <Text style={styles.textosBasicos}>Página Inicial</Text>
            <Button
                title="Ir para outra página 1, pq essa é a 3"
                onPress={() => navigation.navigate('Detalhes')}
            />

        </View>
    );
}

export function ConfiguracoesTela({ navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        teste();
    }, []);



    const teste = async () => {
        try {
            const resposta = await API.MakeRequest('https://reactnative.dev/movies.json', 'GET');
            console.log(resposta.description);
            setData(resposta.movies);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.basico}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList style={styles.textosBasicos}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Text onPress={() => navigation.navigate('Pesquisa')} style={styles.textosBasicos}> Filme: {item.title} Ano: {item.releaseYear}</Text>
                    )}
                />
            )}
            <Text style={styles.textosBasicos}>A outra página, clique no grid para voltar ao inicio </Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export function Pesquisa() {
    return (
        <Tab.Navigator initialRouteName="Pesquisas" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Recomendados') {
                    iconName = focused ? 'md-star' : 'md-star-outline';
                } else if (route.name === 'Configuracoes') {
                    iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'Favoritos') {
                    iconName = focused ? 'heart' : 'heart-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
        })}
        >
            <Tab.Screen name="Recomendados" component={PesquisaTela} />
            <Tab.Screen name="Configuracoes" component={ConfiguracoesTela} />
            <Tab.Screen name="Favoritos" component={FavoritosTela} />
        </Tab.Navigator>
    );
}