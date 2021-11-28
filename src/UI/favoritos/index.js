import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Button, View, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../helpers/ConsumoApi';
import styles from './style.js';
import { SafeAreaView } from 'react-native-safe-area-context';

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


const Tab = createBottomTabNavigator();

const FavoritosTela = ({ navigation }) => {
    const [usuarioLogado, setUsuarioLogado] = useState();

    //função para validar login do SALAFRARIO
    async function validarBotoes() {
        const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
        if (usuarioCache !== null) {
            console.log('Validou os botões na recomendados')
            setUsuarioLogado(true);
        }
        else {
            setUsuarioLogado(false);
        }
    }
    if (usuarioLogado) {
        return (
            <SafeAreaView style={styles.basico}>
                <View style={styles.basico}>
                    <Button
                        title="Favoritos"
                        onPress={() => navigation.navigate('PesquisaInicial')}
                    />

                </View>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.basico}>
                <View style={styles.basico}>
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate('LoginTela')}
                    />

                </View>
            </SafeAreaView>
        )
    }

}

export default FavoritosTela;

