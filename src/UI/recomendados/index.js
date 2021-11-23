import React, { useEffect, useState } from 'react';
import styles from './style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/card';

const RecomendadosTela = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        BuscarCursos()
    }, [])

    async function BuscarCursos() {
        try {
            const listaPesquisas = await AsyncStorage.getItem('CursosPesquisados');
            console.log("Verificando string de listas", listaPesquisas)
            if (listaPesquisas) {
                const list = listaPesquisas.split(",")
                console.log("lista com pesquisas", list)

                const url = 'http://192.168.1.103:3000/curso/tema';

                console.log(url);

                await axios.get(url, {
                    headers: {
                        temas: listaPesquisas
                    }
                }).then((response) => {
                    console.log("Lista com os cursos", response.data.objeto[0])
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

    async function CarregarCurso() {
        try {
            navigation.navigate('DetalhesCursoTela', { curso: item });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.textosBasicos}>recomendados</Text>
                <ScrollView>
                    <View>
                        {data.length > 0 ? data.map((item, index) => (
                            <View key={index}>
                                <Card
                                    nome={item.Nome}
                                    keywords={item.Keywords}
                                    link={item.Link}
                                    temaPrincipal={item.TemaPrincipal}
                                    urlImagem={item.UrlImagem}
                                    CarregarCurso={CarregarCurso}
                                />
                            </View>
                        ))
                            : <View>
                                <Text style={styles.msgRecomendados}>Ainda </Text>
                                <Text style={styles.msgRecomendados}>não </Text>
                                <Text style={styles.msgRecomendados}>temos </Text>
                                <Text style={styles.msgRecomendados}>nenhuma </Text>
                                <Text style={styles.msgRecomendados}>recomendação </Text>
                                <Text style={styles.msgRecomendados}>para </Text>
                                <Text style={styles.msgRecomendados}>você</Text>
                                <Text style={styles.msgRecomendados}>:c</Text>
                            </View>}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default RecomendadosTela
