// import React, { useEffect, useState } from 'react';
// // import { ActivityIndicator, FlatList, Button, View, Text, TextInput } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import API from '../../helpers/ConsumoApi';
// import styles from './style';
// import {
//     Input,
//     SearchBar,
//     Icon,
//     Button,
//     ThemeProvider,
//     InputProps,
// } from 'react-native-elements';

// import {
//     View,
//     ScrollView,
//     StyleSheet,
//     Text,
//     Dimensions,
//     KeyboardAvoidingView,
//     Platform,
//     Vibration,
//     ActivityIndicator,
//     FlatList
// } from 'react-native';

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const dummySearchBarProps = {
//     showLoading: true,
//     onFocus: () => console.log('focus'),
//     onBlur: () => console.log('blur'),
//     onCancel: () => console.log('cancel'),
//     onClear: () => console.log('cleared'),
// };

// const InputFieldsStyle = {
//     borderWidth: 0,
//     flex: 1,
// };

// const SearchBarCustom = (props) => {
//     const [value, setValue] = useState('');
//     return <SearchBar value={value} onChangeText={setValue} {...props} />;
// };


// export function PesquisaTela({ navigation }) {
//     return (
//         <View style={styles.basico}>
//             {/* <Text style={styles.textosBasicos}>Inicio</Text> */}
//             <SearchBarCustom
//                 placeholder="Pesquisa de Cursos"
//                 platform="android"
//                 style={InputFieldsStyle}
//                 {...dummySearchBarProps}
//             />
//             {/* <Button
//                 title="Ir para outra página"
//                 onPress={() => navigation.navigate('Detalhes')}
//             /> */}
//             {/* <TextInput style={styles.textInput} /> */}

//         </View>
//     );
// }
// export function FavoritosTela({ navigation }) {
//     return (
//         <View style={styles.basico}>
//             <Text style={styles.textosBasicos}>Página Inicial</Text>
//             <Button
//                 title="Ir para outra página 1, pq essa é a 3"
//                 onPress={() => navigation.navigate('Detalhes')}
//             />

//         </View>
//     );
// }

// export function ConfiguracoesTela({ navigation }) {

//     const [isLoading, setLoading] = useState(true);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         teste();
//     }, []);



//     const teste = async () => {
//         try {
//             const resposta = await API.MakeRequest('https://reactnative.dev/movies.json', 'GET');
//             console.log(resposta.description);
//             setData(resposta.movies);
//         } catch (error) {
//             console.log(error);
//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <View style={styles.basico}>
//             {isLoading ? <ActivityIndicator /> : (
//                 <FlatList style={styles.textosBasicos}
//                     data={data}
//                     keyExtractor={({ id }, index) => id}
//                     renderItem={({ item }) => (
//                         <Text onPress={() => navigation.navigate('Pesquisa')} style={styles.textosBasicos}> Filme: {item.title} Ano: {item.releaseYear}</Text>
//                     )}
//                 />
//             )}
//             <Text style={styles.textosBasicos}>A outra página, clique no grid para voltar ao inicio </Text>
//         </View>
//     );
// }

// const Tab = createBottomTabNavigator();

// export function Pesquisa() {
//     return (
//         <Tab.Navigator initialRouteName="Pesquisas" screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//                 let iconName;

//                 if (route.name === 'Recomendados') {
//                     iconName = focused ? 'md-star' : 'md-star-outline';
//                 } else if (route.name === 'Configuracoes') {
//                     iconName = focused ? 'settings' : 'settings-outline';
//                 } else if (route.name === 'Favoritos') {
//                     iconName = focused ? 'heart' : 'heart-outline';
//                 }

//                 return <Ionicons name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: '#000',
//             tabBarInactiveTintColor: '#000',
//         })}
//         >
//             <Tab.Screen name="Recomendados" component={PesquisaTela} />
//             <Tab.Screen name="Configuracoes" component={ConfiguracoesTela} />
//             <Tab.Screen name="Favoritos" component={FavoritosTela} />
//         </Tab.Navigator>
//     );
// }

// function app() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="PesquisaTela" component={PesquisaTela} />
//           <Stack.Screen name="FavoritosTela" component={FavoritosTela} />
//           <Stack.Screen name="ConfiguracoesTela" component={ConfiguracoesTela} />
//           <Stack.Screen name="Pesquisa" component={Pesquisa} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }

//   export default app;


import React, { useState, useContext, useEffect } from 'react';
import styles from '../../../assets/styles/styles.js';
// import { Pesquisa, ConfiguracoesTela, FavoritosTela, PesquisaTela } from './src/UI/pesquisa/index.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from '../components/card'
import ConfiguracoesTela from '../configuracoes';
import DetalhesCursoTela from '../curso';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    Input,
    SearchBar,
    Icon,
    Button,
    ThemeProvider,
    InputProps,
} from 'react-native-elements';

import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Vibration,
    ActivityIndicator,
    FlatList,
    TextInput,
    SafeAreaView
} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import axios from 'axios';

// const SCREEN_WIDTH = Dimensions.get('window').width;
const dummySearchBarProps = {
    showLoading: true,
    onFocus: () => console.log('focus'),
    onBlur: () => console.log('blur'),
    onCancel: () => console.log('cancel'),
    onClear: () => console.log('cleared'),
};

const InputFieldsStyle = {
    borderWidth: 0,
    flex: 1,
};

const SearchBarCustom = (props) => {
    const [value, setValue] = useState('');
    return <SearchBar value={value} onChangeText={setValue} {...props} />;
};


const PesquisaInicial = ({ navigation }) => {

    // onScreenLoad = async () => {
    //     console.log("Caiu na função de load da página");
    //     try {
    //         const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
    //         console.log("USUARIO NO LOGIN " + usuarioCache);
    //         if (usuarioCache !== null) {
    //             CodePush.restartApp();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     onScreenLoad();
    // }, []);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [palavraChave, setPalavraChave] = useState('');

    async function BuscarCursos() {
        try {
            const url = 'http://192.168.15.47:3000/curso?p=' + encodeURIComponent(palavraChave);

            console.log(url);

            await axios.get(url).then((response) => {
                console.log(response);
                console.log(response.data.objeto);
                setData(response.data.objeto);
            });

            // const resposta = await API.MakeRequest('http://localhost:3000/curso?p=java', 'GET');
            // console.log(resposta);
            // setData(resposta.movies);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    };

    async function CarregarCurso() {
        try {
            navigation.navigate('DetalhesCursoTela');
        } catch (error) {
            console.log(error);
        }
    };

    return (


        <View style={styles.basico}>
            {/* <Text style={styles.textosBasicos}>Inicio</Text> */}
            {/* <SearchBarCustom
                placeholder="Pesquisa de Cursos"
                platform="android"
                style={InputFieldsStyle}
                {...dummySearchBarProps}
                {...{ marginTop: 80 }}
            /> */}
            <TextInput
                placeholder="Buscar Cursos"
                placeholderTextColor="#fff"
                style={{ top: 40, paddingTop: 40 }}
                onChangeText={setPalavraChave}
                value={palavraChave}
            />


            <Button
                title="Buscar"
                icon={{
                    name: 'search',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(90, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                    marginTop: 50
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={BuscarCursos}
                style={{ color: 'white', top: 70, paddingTop: 20 }}
            />

            {/* {isLoading ? <ActivityIndicator /> : (
                <FlatList style={{ color: 'white', top: 50 }}
                    data={data}
                    keyExtractor={item => item.link}
                    renderItem={({ item }) => (
                        <Text style={styles.textosBasicos}> Curso: {item.nome} Link: {item.link}</Text>
                    )}
                />
            )} */}

            <ScrollView style={styles.container}>
                {data.map((item) => (
                    <View key={item.link}>
                        <Card
                            nome={item.nome}
                            keywords={item.keywords}
                            link={item.link}
                            temaPrincipal={item.temaPrincipal}
                            urlImagem={item.urlImagem}
                            CarregarCurso={CarregarCurso}
                        />
                    </View>
                ))}
            </ScrollView>

            {/* <Tab.Navigator initialRouteName="Pesquisas" screenOptions={({ route }) => ({
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
                <Tab.Screen name="Configuracoes" component={ConfiguracoesTela} />
            </Tab.Navigator> */}
        </View>
        /*       <View style={styles.basico}>
                   <Text style={styles.textosBasicos} onPress={() => navigation.navigate('ConfiguracoesTela')}>A outra página, clique no grid para voltar ao inicio </Text>
       
                   
       {
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
                       <Tab.Screen name="Configuracoes" component={ConfiguracoesTela2} onPress={() => navigation.navigate('ConfiguracoesTela')} />
                   </Tab.Navigator> }
               </View>*/
    );
}

export default PesquisaInicial;





