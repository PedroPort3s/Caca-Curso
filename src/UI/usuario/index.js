import React, { useState } from 'react';
import styles from '../../../assets/styles/styles.js';
// import { Pesquisa, ConfiguracoesTela, FavoritosTela, PesquisaTela } from './src/UI/pesquisa/index.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

export function UsuarioTela({ navigation }) {
    const Tab = createBottomTabNavigator();
    return (

        <View style={styles.basico}>
            <Button
                title="Tela de Usuário"
                onPress={() => navigation.navigate('PesquisaInicial')}
            />

        </View>
    );
}

const Stack = createNativeStackNavigator();

export default UsuarioTela;