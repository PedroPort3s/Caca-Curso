import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/core';

export default function ConfiguracoesTela({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    // export default function ConfiguracoesTela({ navigation }) {
    validarBotoes();

    const [usuarioLogado, setUsuarioLogado] = useState();

    const removerUsuarioCache = async () => {

        try {
            await AsyncStorage.removeItem('CacaCursoCredentials');
            navigation.navigate("LoginTela");
        }
        catch (error) {
            console.log(error);
        }
    };

    async function validarBotoes() {
        const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
        if (usuarioCache !== null) {
            setUsuarioLogado(true);
        }
        else {
            setUsuarioLogado(false);
        }
    }

    // carrega o json de usuario no cache do app no celular
    onScreenLoad = async () => {
        console.log("Caiu na função de load da página de configurações");
        try {
            validarBotoes();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onScreenLoad();
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const isFocused = useIsFocused()

    useEffect(() => {
        onScreenLoad()
    }, [isFocused])


    if (usuarioLogado) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                >
                    
                        <View style={styles.containerInvisivel}>
                            <Button
                                text="Favoritos"
                                buttonCustomStyles={{
                                    backgroundColor: 'yellow',
                                    borderRadius: 50,
                                    marginTop: 10
                                }}
                                onClick={() => { alert("Favoritos!") }}
                            />

                            <Button
                                text="Recomendados"
                                buttonCustomStyles={{
                                    backgroundColor: 'yellow',
                                    borderRadius: 50,
                                    marginTop: 10
                                }}
                                onClick={() => { alert("Recomendados!") }}
                            />

                            <Button
                                text="Perfil"
                                buttonCustomStyles={{
                                    backgroundColor: 'yellow',
                                    borderRadius: 50,
                                    marginTop: 10
                                }}
                                onClick={() => navigation.navigate('UsuarioTela')}
                            />
                        </View>
                    

                    <Button
                        text="Login"
                        buttonCustomStyles={{
                            backgroundColor: "#6495ED",
                            borderRadius: 50,
                            marginTop: 10
                        }}
                        onClick={() => navigation.navigate('LoginTela')}
                    />

                    <Button
                        text="Sair"
                        buttonCustomStyles={{
                            backgroundColor: 'red',
                            borderRadius: 50,
                            marginTop: 10
                        }}
                        onClick={removerUsuarioCache}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                >
                    <Button
                        text="Login"
                        buttonCustomStyles={{
                            backgroundColor: "#6495ED",
                            borderRadius: 50,
                            marginTop: 10
                        }}
                        onClick={() => navigation.navigate('LoginTela')}
                    />

                    <Button
                        text="Sair"
                        buttonCustomStyles={{
                            backgroundColor: 'red',
                            borderRadius: 50,
                            marginTop: 10
                        }}
                        onClick={removerUsuarioCache}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
});