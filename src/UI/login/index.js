import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import * as GoogleLogin from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';
import { CredentialsContext } from '../../helpers/CredentialsContext';
import { SocialIcon } from 'react-native-elements'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/core';
import h from '../../helpers/ConsumoApi';

const Login = ({ navigation }) => {

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  async function gravarUsuario(nome, email, idThirdParty, imageUrl, provider) {

    let usuarioJson = await AsyncStorage.getItem('CacaCursoCredentials')

    usuarioJson = JSON.parse(usuarioJson)
    console.log("Usuario transformado", usuarioJson.json)

    const newUsuario = await axios.post(`${h.urlApi}/usuario`,
      {
        nome: nome,
        email: email,
        idThirdParty: idThirdParty,
        imageUrl: imageUrl,
        provider: provider
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )

    console.log("Usuario banco", newUsuario.data)
    usuarioJson.json["usuarioIdBanco"] = newUsuario.data.id

    persistLogin(usuarioJson)
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
          // const dadosUsuario = {
          //   json: {
          //     email,
          //     name,
          //     picture: photoUrl,
          //     id
          //   }
          // };

          persistLogin({
            json: {
              email,
              name,
              picture: photoUrl,
              id
            }
          }, 'Login com Google bem sucedido', 'SUCCESS');

          AsyncStorage.getItem('CacaCursoCredentials').then((res) => console.log("Login com Google bem sucedido: " + res));

          //gravar no mysql via api Ca??a-Cursos
          // gravarUsuario(name, email, id, photoUrl, "Google");
          validarLogin(name, email, id, photoUrl, "Google");

          navigation.navigate('PesquisaInicial');

        } else {
          throw new Error("N??o foi possivel efetuar login com o google");
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

        //gravar no mysql via api Ca??a-Cursos
        validarLogin(name, email, id, picture.data.url, "Facebook");

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

  const validarLogin = async (name, email, id, picture, provider) => {
    console.log("Caiu no validar");
    console.log(email);
    try {
      const url = `${h.urlApi}/usuario/carregar/` + encodeURIComponent(email);

      await axios.get(url).then(async (response) => {
        // setData(response.data.objeto);
        if (response.data == null) {
          // n??o carregou ent??o grava
          //gravar no mysql via api Ca??a-Cursos

          gravarUsuario(name, email, id, picture, provider);
        }
        else {
          //vai pra pesquisa pq j?? ta certo
          console.log("carregou o usuario com e-mail - " + email);

          let usuarioJson = await AsyncStorage.getItem('CacaCursoCredentials')

          usuarioJson = JSON.parse(usuarioJson)
          console.log("Usuario transformado", usuarioJson)
          console.log("Usuario vindo do banco", response.data)

          usuarioJson.json["usuarioIdBanco"] = response.data.id

          persistLogin(usuarioJson)

          navigation.navigate('PesquisaInicial');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  const removerUsuarioCache = async () => {

    try {
      await AsyncStorage.removeItem('CacaCursoCredentials');
      navigation.navigate("LoginTela");
    }
    catch (error) {
      console.log(error);
    }
  };

  // carrega o json de usuario no cache do app no celular
  onScreenLoad = async () => {
    console.log("Caiu na fun????o de load da p??gina");
    try {
      const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
      console.log("USUARIO NO LOGIN " + usuarioCache);
      if (usuarioCache !== null) {
        console.log(usuarioCache);
        navigation.navigate('PesquisaInicial');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const isFocused = useIsFocused()
  
  useEffect(() => {
    onScreenLoad();
    validarUsuarioLogado()
  }, [isFocused])


  //fun????o para validar login
  async function validarUsuarioLogado() {
    const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
    if (usuarioCache !== null) {
      navigation.navigate('PesquisaInicial');
    }
  }

  return (
    <View style={styles.basico}>
      <Text style={styles.textosBasicos}>Ca??a Cursos</Text>
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
