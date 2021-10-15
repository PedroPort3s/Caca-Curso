import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, FlatList, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from './src/helpers/ConsumoApi.js';
import styles from './assets/styles/styles';
import * as GoogleLogin from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';
import { CredentialsContext } from './src/helpers/CredentialsContext.js';
import { Pesquisa, ConfiguracoesTela, FavoritosTela, RecomendadosTela } from './src/UI/pesquisa/index.js'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Login = ({ navigation }) => {
  
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  
  // const handleMessage = (message, type = '') => {
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
        // handleMessage('Login via Google efetuado com sucesso', 'SUCCESS');
        persistLogin({ email, name, photoUrl, id }, 'Login com Google bem sucedido', 'SUCCESS');
        
        AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Google bem sucedido: " + res));

        navigation.navigate('Pesquisa');
        
      } else {
          // handleMessage('Login com o Google cancelado pelo usuário');
        }
        settGoogleSubmitting(false);
        
      })
      .catch((error) => {
        // handleMessage('Houve um erro ao tentar executar o processo de login com o Google');
        console.log(error.message);
        settGoogleSubmitting(false);
      });
    };
    
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
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
        
        const json = await response.json();
        
        console.log(json);
        
        persistLogin({ json }, 'Login com Facebook bem sucedido', 'SUCCESS');
        
        AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Facebook bem sucedido: " + res));

        navigation.navigate('Pesquisa');
      } else {
        type === 'cancel'
      }
    }
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
      // handleMessage(message, status);
      setStoredCredentials(credentials);
    })
    .catch((error) => {
      // handleMessage('Persisting login failed');
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

const Stack = createNativeStackNavigator();

function app() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RecomendadosTela" component={RecomendadosTela} />
        <Stack.Screen name="FavoritosTela" component={FavoritosTela} />
        <Stack.Screen name="ConfiguracoesTela" component={ConfiguracoesTela} />
        <Stack.Screen name="Pesquisa" component={Pesquisa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default app;





