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


import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import styles from '../../../assets/styles/styles.js';
// import { Pesquisa, ConfiguracoesTela, FavoritosTela, PesquisaTela } from './src/UI/pesquisa/index.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pesquisa, ConfiguracoesTela } from '../../UI/configuracoes/index.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConfiguracoesTela2 from '../configuracoes/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../helpers/ConsumoApi.js';
import Card from '../components/card'


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

export function PesquisaInicial({ navigation }) {

    //   const [message, setMessage] = useState();
    //   const [messageType, setMessageType] = useState();

    //   const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    //   async function gravarUsuario(nome, email, idThirdParty, imageUrl, provider) {
    //     await fetch('http://192.168.15.47:3000/usuario', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         nome: nome,
    //         email: email,
    //         idThirdParty: idThirdParty,
    //         imageUrl: imageUrl,
    //         provider: provider
    //       })
    //     });
    //   };

    //   const [googleSubmitting, settGoogleSubmitting] = useState(false);

    //   const efetuarGoogleLogin = () => {
    //     settGoogleSubmitting(true);
    //     const config = {
    //       androidClientId: '123256132157-h8hgctq206mcta0a35bplb4ocnj855on.apps.googleusercontent.com',
    //       scopes: ['profile', 'email']
    //     };

    //     GoogleLogin.logInAsync(config)
    //       .then((result) => {
    //         const { type, user } = result;

    //         if (type == 'success') {
    //           const { email, name, photoUrl, id } = user;
    //           persistLogin({ email, name, photoUrl, id }, 'Login com Google bem sucedido', 'SUCCESS');

    //           AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Google bem sucedido: " + res));

    //           //gravar no mysql via api Caça-Cursos
    //           gravarUsuario(name, email, id, photoUrl, "Google");

    //           navigation.navigate('Pesquisa');

    //         } else {
    //           throw error;
    //         }
    //         settGoogleSubmitting(false);

    //       })
    //       .catch((error) => {
    //         console.log(error.message);
    //         settGoogleSubmitting(false);
    //       });
    //   };

    //   async function efetuarFacebookLogin() {
    //     try {
    //       await Facebook.initializeAsync({
    //         appId: '1940992706081759'
    //       });
    //       const {
    //         type,
    //         token,
    //         expirationDate,
    //         permissions,
    //         declinedPermissions,
    //       } = await Facebook.logInWithReadPermissionsAsync({
    //         permissions: ['public_profile', 'email'],
    //       });
    //       if (type === 'success') {

    //         const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);

    //         const json = await response.json();
    //         const { name, email, id, picture } = json;
    //         console.log(json);

    //         persistLogin({ json }, 'Login com Facebook bem sucedido', 'SUCCESS');

    //         AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Facebook bem sucedido: " + res));

    //         //gravar no mysql via api Caça-Cursos
    //         gravarUsuario(name, email, id, picture.data.url, "Facebook");

    //         navigation.navigate('Pesquisa');
    //       } else {
    //         type === 'cancel'
    //       }
    //     }
    //     catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   const efetuarAppleLogin = () => {
    //     try {
    //       const credential = AppleAuthentication.signInAsync({
    //         requestedScopes: [
    //           AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //           AppleAuthentication.AppleAuthenticationScope.EMAIL,
    //         ],
    //       });
    //       // signed in
    //     } catch (e) {
    //       if (e.code === 'ERR_CANCELED') {
    //         // handle that the user canceled the sign-in flow
    //       } else {
    //         // handle other errors
    //       }
    //     }
    //   };

    //   const persistLogin = (credentials, message, status) => {
    //     AsyncStorage.setItem('CacaCursoCredentials', JSON.stringify(credentials))
    //       .then(() => {
    //         setStoredCredentials(credentials);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [palavraChave, setPalavraChave] = useState('');

    async function BuscarCursos() {
        console.log(palavraChave);
        try {
            const url = 'http://192.168.1.103:3000/curso/pesquisa?p=' + encodeURIComponent(palavraChave);

            console.log(url);

            await axios.get(url).catch((err) => {
                console.log("Erro ao consultar url: " + url, err)
            }).then((response) => {
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

    const Tab = createBottomTabNavigator();

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
                    marginTop: 30
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
                {
                    data.map((item) => (
                        <View key={item.link}>
                            <Card
                                nome={item.nome}
                                keywords={item.keywords}
                                link={item.link}
                                temaPrincipal={item.temaPrincipal}
                                urlImagem={item.urlImagem}
                                navigateTo={() => {
                                    navigation.navigate("Detalhes", { curso: item })
                                }}
                            />
                        </View>
                    ))
                }
            </ScrollView>


            {/* <Button
                title="Ir para outra página"
                onPress={() => navigation.navigate('Detalhes')}
            /> */}
            {/* <TextInput style={styles.textInput} /> */}

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

const Stack = createNativeStackNavigator();

export default PesquisaInicial;





