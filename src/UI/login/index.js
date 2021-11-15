import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import * as GoogleLogin from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';
import { CredentialsContext } from '../../helpers/CredentialsContext';
import { SocialIcon } from 'react-native-elements'

const Login = ({ navigation }) => {

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  async function gravarUsuario(nome, email, idThirdParty, imageUrl, provider) {
    await fetch('http://192.168.15.47:3000/usuario', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        idThirdParty: idThirdParty,
        imageUrl: imageUrl,
        provider: provider
      })
    });
  };

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
          persistLogin({ email, name, photoUrl, id }, 'Login com Google bem sucedido', 'SUCCESS');

          AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Google bem sucedido: " + res));

          //gravar no mysql via api Caça-Cursos
          gravarUsuario(name, email, id, photoUrl, "Google");

          navigation.navigate('PesquisaInicial');

        } else {
          throw error;
        }
        settGoogleSubmitting(false);

      })
      .catch((error) => {
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
        const { name, email, id, picture } = json;
        console.log(json);

        persistLogin({ json }, 'Login com Facebook bem sucedido', 'SUCCESS');

        AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Facebook bem sucedido: " + res));

        //gravar no mysql via api Caça-Cursos
        gravarUsuario(name, email, id, picture.data.url, "Facebook");

        navigation.navigate('PesquisaInicial');
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
    console.log(credentials);
    AsyncStorage.setItem('CacaCursoCredentials', JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validarLogin = () => {

  }


  removerUsuarioCache = async () => {

    try {
      await AsyncStorage.removeItem(CacaCursoCredentials);
      navigation.navigate("Login");
    }
    catch (error) {
      console.log(error);
    }
  }
  // carrega o json de usuario no cache do app no celular
  onScreenLoad = async () => {
    console.log("Caiu na função de load da página");
    try {
      const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
      if (usuarioCache !== null) {
        console.log(usuarioCache);
        navigation.navigate('PesquisaInicial');
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    onScreenLoad();
  }, []);

  return (
    <View style={styles.basico}>
      <Text style={styles.textosBasicos}>Caça Cursos</Text>
      <Text style={styles.textoLogin}>Escolha sua plataforma para efetuar o login</Text>

      {!googleSubmitting && (
        <SocialIcon type='google' onPress={efetuarGoogleLogin} />
      )}
      <SocialIcon type='facebook' onPress={efetuarFacebookLogin} />
      <SocialIcon type='apple' onPress={efetuarAppleLogin} />


    </View>
  );
}

export default Login;
