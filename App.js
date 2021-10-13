import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from './src/helpers/ConsumoApi.js';
import styles from './assets/styles/styles';
import * as GoogleLogin from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';

// function RecomendadosTela({ navigation }) {
//   return (
//     <View style={styles.basico}>
//       <Text style={styles.textosBasicos}>Página Inicial</Text>
//       <Button
//         title="Ir para outra página"
//         onPress={() => navigation.navigate('Detalhes')}
//       />

//     </View>
//   );
// }
// function FavoritosTela({ navigation }) {
//   return (
//     <View style={styles.basico}>
//       <Text style={styles.textosBasicos}>Página Inicial</Text>
//       <Button
//         title="Ir para outra página 1, pq essa é a 3"
//         onPress={() => navigation.navigate('Detalhes')}
//       />

//     </View>
//   );
// }

// function ConfiguracoesTela({ navigation }) {

//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     teste();
//   }, []);



//   const teste = async () => {
//     try {
//       const resposta = await API.MakeRequest('https://reactnative.dev/movies.json', 'GET');
//       console.log(resposta.description);
//       setData(resposta.movies);
//     } catch (error) {
//       console.log(error);
//     }
//     finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <View style={styles.basico}>
//       {isLoading ? <ActivityIndicator /> : (
//         <FlatList style={styles.textosBasicos}
//           data={data}
//           keyExtractor={({ id }, index) => id}
//           renderItem={({ item }) => (
//             <Text onPress={() => navigation.navigate('Recomendados')} style={styles.textosBasicos}> Filme: {item.title} Ano: {item.releaseYear}</Text>
//           )}
//         />
//       )}
//       <Text style={styles.textosBasicos}>A outra página, clique no grid para voltar ao inicio </Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator initialRouteName="Recomendados" screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Recomendados') {
//             iconName = focused ? 'md-star' : 'md-star-outline';
//           } else if (route.name === 'Configuracoes') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           } else if (route.name === 'Favoritos') {
//             iconName = focused ? 'heart' : 'heart-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#000',
//         tabBarInactiveTintColor: '#000',
//       })}
//       >
//         <Tab.Screen name="Recomendados" component={RecomendadosTela} />
//         <Tab.Screen name="Configuracoes" component={ConfiguracoesTela} />
//         <Tab.Screen name="Favoritos" component={FavoritosTela} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


const Login = ({ navigation }) => {
  const [message, setMessage] = useState();

  // const mensagemRetorno = (message, type = '') => {
  //   setMessage(message);
  //   setMessageType(type);
  // };

  const [googleSubmitting, settGoogleSubmitting] = useState(false);

  const efetuarGoogleLogin = () => {
    settGoogleSubmitting(true);
    const config = {
      androidClientId: '123256132157-h8hgctq206mcta0a35bplb4ocnj855on.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    };

    GoogleLogin.logInAsync(config)
      .then((result) => {
        const { type, user } = result;

        if (type == 'success') {
          const { email, name, photoUrl, id } = user;
          // mensagemRetorno('Login via Google efetuado com sucesso', 'SUCCESS');
          persistLogin({ email, name, photoUrl, id }, 'Login com Google bem sucedido', 'SUCCESS');

          setTimeout(() => navigation.navigate('', { email, user, photoUrl, id }), 1000);

          AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Google bem sucedido: " + res));
        } else {
          // mensagemRetorno('Login com o Google cancelado pelo usuário');
        }
        settGoogleSubmitting(false);

      })
      .catch((error) => {
        // mensagemRetorno('Houve um erro ao tentar executar o processo de login com o Google');
        console.log(error.message);
        settGoogleSubmitting(false);
      });
  };

  // const efetuarFacebookLogin = async () => {
  //   await Facebook.initializeAsync('1940992706081759');

  //   const { type, token } = await Facebook.logInWithReadPermissionsAsync(
  //     { permissions: ['public_profile', 'email'] },
  //   );

  //   if (type === 'success') {
  //     // Get the user's name using Facebook's Graph API
  //     const response = await fetch(`https://graph.facebook.com/oauth/access_token=${token}`);
  //     // Alert.alert('Logado', `Olá ${(response.json()).name}!`);

  //     persistLogin({ response }, 'Login com Facebook bem sucedido', 'SUCCESS');

  //     AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Facebook bem sucedido: " + res));
  //   } else {
  //     type === 'cancel'
  //   }
  // }

  async function efetuarFacebookLogin() {
    try {
      await Facebook.initializeAsync({
        appId: '1940992706081759'
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/oauth/access_token=${token}`);
        // Alert.alert('Logado', `Olá ${(response.json()).name}!`);

        // persistLogin({ response }, 'Login com Facebook bem sucedido', 'SUCCESS');

        AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Facebook bem sucedido: " + res));
      } else {
        type === 'cancel'
      }
    }
    //catch ({ message }) {
    //   console.log(`Erro ao tentar logar com o Facebook: ${message}`);
    // }
    catch (error) {
      console.log(error);
    }
  };
  const efetuarAppleLogin = () => {
    try {
      const credential = AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('CacaCursoCredentials', JSON.stringify(credentials))
      .then(() => {
        // mensagemRetorno(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        // mensagemRetorno('Persisting login failed');
        console.log(error);
      });
  };

  return (
    <View style={styles.basico}>
      <Text style={styles.textosBasicos}>Caça Cursos</Text>
      {!googleSubmitting && (
        <Button onPress={efetuarGoogleLogin} title='Login Google'></Button>
      )}

      <Button onPress={efetuarFacebookLogin} title='Login Facebook'></Button>

      <Button onPress={efetuarAppleLogin} title='Login Apple'></Button>
    </View>
  );
}

export default Login;





