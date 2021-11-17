import React, { useState, useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';



const UsuarioTela = ({ navigation }) => {

    const [nomeUsuario, setNomeUsuario] = useState();
    const [emailUsuario, setEmailUsuario] = useState();
    const [photoUsuario, setPhotoUsuario] = useState();

    const removerUsuarioCache = async () => {
        try {
            await AsyncStorage.removeItem('CacaCursoCredentials');
            navigation.navigate("LoginTela");
        }
        catch (error) {
            console.log(error);
        }
    };
    const navegarFavoritos = async () => {
        try {
            navigation.navigate("FavoritosTela");
        }
        catch (error) {
            console.log(error);
        }
    };
    const navegarRecomendados = async () => {
        try {
            navigation.navigate("RecomendadosTela");
        }
        catch (error) {
            console.log(error);
        }
    };


    const setarUsuario = (nomeUsuario, emailUsuario, photoUsuario) => {

        setNomeUsuario(nomeUsuario);
        setEmailUsuario(emailUsuario);
        setPhotoUsuario(photoUsuario);
        // console.log(" Usuario setado : " + nomeUsuario);
        // console.log(" email Usuario setado : " + emailUsuario);
        // console.log(" photo Usuario setado : " + photoUsuario);
    }
    // carrega o json de usuario no cache do app no celular
    onScreenLoad = async () => {
        console.log("Caiu na função de load da página de usuario");
        try {
            const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
            if (usuarioCache !== null) {
                // console.log(usuarioCache);
                // console.log("Caiu sfsdfsdf");

                // console.log("Object usuario cache ------- ", {nome: "Cuvaldo"})
                // const teste = JSON.parse(usuarioCache.object);
                // console.log("Mostrando como printou o teste ------- " + teste.object); 
                // setUsuario(JSON.parse(usuarioCache));

                
                // console.log("Usuário cache facebook que chegou ao usuario: " + usuarioCache);
                let parsed = JSON.parse(usuarioCache);
                // console.log("Image do user facebook: -- " + parsed.json.picture.data.url);

                //Facebook setagem
                if(parsed.json !== undefined){
                    //facebook - padrão de store do facebook
                    console.log("Caiu no facebook");
                    setarUsuario(parsed.json.name, parsed.json.email, parsed.json.picture.data.url);
                }
                else{
                    //google - padrão de store do google
                    console.log("Caiu no google");
                    setarUsuario(parsed.name, parsed.email, parsed.photoUrl);
                }


                // console.log("Parsed teste " + parsed.name);
                // console.log("Parsed teste 2 " + parsed.email);
                // console.log("Parsed teste 3 " + parsed.photoUrl);
                
                //setarUsuario(parsed.name, parsed.email, parsed.photoUrl);
                // setNomeUsuario(parsed.name);
                // console.log(" Usuario setado : " + nomeUsuario);
            }
            else {

            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        onScreenLoad();
    }, []);

    return (

        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: photoUsuario }} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}> {nomeUsuario}</Text>
                    <Text style={styles.info}>Um belo de um ser humano</Text>
                    <Text style={styles.description}>{emailUsuario}</Text>

                    <TouchableOpacity style={styles.buttonContainer} onPress={navegarFavoritos}>
                        <Text>Favoritos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={navegarRecomendados}>
                        <Text>Recomendados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={removerUsuarioCache}> 
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default UsuarioTela;
