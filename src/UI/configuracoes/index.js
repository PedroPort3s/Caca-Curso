import React, { useState, useContext, useEffect } from 'react';
// import { ActivityIndicator, FlatList, Button, View, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../helpers/ConsumoApi';
import styles from './style.js';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    Input,
    SearchBar,
    Icon,
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
    FlatList
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
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

const removerUsuarioCache = async () => {

    try {
        await AsyncStorage.removeItem('CacaCursoCredentials');
        navigation.navigate("LoginTela");
    }
    catch (error) {
        console.log(error);
    }
};

const Tab = createBottomTabNavigator();

export default function ConfiguracoesTela({ navigation }) {
    // carrega o json de usuario no cache do app no celular
    onScreenLoad = async () => {
        console.log("Caiu na função de load da página de configurações");
        try {
            const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
            if (usuarioCache !== null) {
                console.log(usuarioCache);

                console.log(" Usuario setado configs: " + usuarioCache);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        onScreenLoad();
    }, []);
    return (

        // <View style={styles.basico}>
        //     <Button
        //         title="Configs"
        //         onPress={() => navigation.navigate('PesquisaInicial')}
        //     />

        // </View>
        <View style={styles.container}>
            {/* ORANGE BUTTON */}

            <Button
                text="Favoritos"
                buttonCustomStyles={{
                    backgroundColor: 'yellow',
                    borderRadius: 50,
                    marginTop: 10
                }}
                // textCustomStyles={{
                //     color: "#505050"
                // }}
                onClick={() => { alert("Favoritos!") }}
            />

            <Button
                text="Recomendados"
                buttonCustomStyles={{
                    backgroundColor: 'yellow',
                    borderRadius: 50,
                    marginTop: 10
                }}
                // textCustomStyles={{
                //     color: "#505050"
                // }}
                onClick={() => { alert("Recomendados!") }}
            />

            <Button
                text="Perfil"
                buttonCustomStyles={{
                    backgroundColor: 'yellow',
                    borderRadius: 50,
                    marginTop: 10
                }}
                // textCustomStyles={{
                //     color: "#505050"
                // }}
                onClick={() => navigation.navigate('UsuarioTela')}
            />

            <Button
                text="Login"
                buttonCustomStyles={{
                    backgroundColor: "#6495ED",
                    borderRadius: 50,
                    marginTop: 10
                }}
                // textCustomStyles={{
                //     color: "#505050"
                // }}
                onClick={() => { alert("Perfil!") }}
            />


            <Button
                text="Sair"
                buttonCustomStyles={{
                    backgroundColor: 'red',
                    borderRadius: 50,
                    marginTop: 10
                }}
                // textCustomStyles={{
                //     color: "#505050"
                // }}
                onClick={() => { alert("Perfil!") }}
            />

        </View>
    );
}

