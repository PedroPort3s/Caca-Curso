import React, { useEffect, useState } from 'react';
import styles from './style.js';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    View,
} from 'react-native';

export default function ConfiguracoesTela({ navigation }) {

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
    // carrega o json de usuario no cache do app no celular
    onScreenLoad = async () => {
        console.log("Caiu na função de load da página de configurações");
        try {
            const usuarioCache = await AsyncStorage.getItem('CacaCursoCredentials');
            if (usuarioCache !== null) {
                console.log(usuarioCache);

                console.log(" Usuario setado configs: " + usuarioCache);
                setUsuarioLogado(true);
            }
            else {
                setUsuarioLogado(false);
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
            {usuarioLogado && (
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
            )}

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

        </View>
    );
}

