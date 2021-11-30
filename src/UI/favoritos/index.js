import React, { useEffect, useState } from 'react';
import styles from './style.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import h from '../../helpers/ConsumoApi';

import {
    Button,
} from 'react-native-elements';

import {
    View,
    ScrollView,
    Text,
} from 'react-native';

import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import Card from '../components/card';
import { getUsuarioLogado } from '../../helpers/UsuarioLogado';

const FavoritosTela = ({ navigation }) => {
    const [usuarioLogado, setUsuarioLogado] = useState();
    const [usuarioLogadoObj, setUsuarioLogadoObj] = useState();

    const isFocused = useIsFocused()

    //função para validar login do SALAFRARIO
    async function validarBotoes() {
        let usuarioLogadoJson = await getUsuarioLogado()
        if (usuarioLogadoJson !== null) {
            usuarioLogadoJson = JSON.parse(usuarioLogadoJson)
            console.log("Usuario logado: ", usuarioLogadoJson)
            setUsuarioLogadoObj(usuarioLogadoJson.json)
            
            console.log('Validou os botões nos favoritos')
            setUsuarioLogado(true);
        }
        else {
            setUsuarioLogado(false);
        }
    }

    const [data, setData] = useState([]);

    async function BuscarCursos() {
        try {
            if (usuarioLogadoObj) {
                //Tenho de pegar os que são favoritos
                const url = `${h.urlApi}/usuariofavoritos?usuario_id=` + usuarioLogadoObj.usuarioIdBanco;

                console.log(url);
                console.log("url de busca dos favoritos: ", url)

                await axios.get(url).then((response) => {
                    console.log("Lista com os cursos favoritos: ", response.data.objeto)
                    setData(response.data.objeto);
                }).catch((err) => {
                    console.log("Erro ao consultar url: " + url, err)
                });
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        validarBotoes()
    }, [isFocused])
    
    useEffect(() => {
        BuscarCursos()
    }, [usuarioLogadoObj])

    if (usuarioLogado) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.msgFavoritos}>Favoritos</Text>
                    <ScrollView>
                        <View>
                            {data.length > 0 ? data.map((item, index) => (
                                <View key={index}>
                                    <Card
                                        nome={item.Curso.Nome}
                                        keywords={item.Curso.Keywords}
                                        link={item.Curso.Link}
                                        temaPrincipal={item.Curso.TemaPrincipal}
                                        urlImagem={item.Curso.UrlImagem}
                                        CarregarCurso={() => {
                                            navigation.navigate("Detalhes", { curso: item.Curso })
                                        }}
                                    />
                                </View>
                            ))
                                : <View>
                                    <Text style={styles.msgFavoritos}>Você </Text>
                                    <Text style={styles.msgFavoritos}>ainda </Text>
                                    <Text style={styles.msgFavoritos}>não </Text>
                                    <Text style={styles.msgFavoritos}>tem </Text>
                                    <Text style={styles.msgFavoritos}>nenhum </Text>
                                    <Text style={styles.msgFavoritos}>favorito </Text>
                                    <Text style={styles.msgFavoritos}>{"</3"}</Text>
                                </View>}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Button
                        title="Para utilizar este recurso, é necessário estar logado"
                        onPress={() => navigation.navigate('LoginTela')}
                    />

                </View>
            </SafeAreaView>
        )
    }

}

export default FavoritosTela;

