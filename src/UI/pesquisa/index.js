
import React, { useState } from 'react';
import styles from '../../../assets/styles/styles.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from '../components/card'
import ConfiguracoesTela from '../configuracoes';
import DetalhesCursoTela from '../curso';
import Ionicons from 'react-native-vector-icons/Ionicons';
import h from '../../helpers/ConsumoApi';

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
import AsyncStorage from '@react-native-async-storage/async-storage';

// const SCREEN_WIDTH = Dimensions.get('window').width;
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

const PesquisaInicial = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [palavraChave, setPalavraChave] = useState('');
    const [loading, setLoading] = useState(false);

    const salvarAsyncStorage = async (lista) => {
        // await AsyncStorage.removeItem("CursosPesquisados")
        console.log("Lista de nomes", lista.toString())
        await AsyncStorage.setItem('CursosPesquisados', lista.toString())
            .then(() => {
                console.log("salvou tema pesquisado com sucesso")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function BuscarCursos() {
        try {
            setLoading(true);
            const url = `${h.urlApi}/curso/pesquisa?p=` + encodeURIComponent(palavraChave);

            console.log(url);

            await axios.get(url)
                .then((response) => {
                    setData(response.data.objeto);
                }).catch((error) => {
                    alert("Atenção: " + error.response.data)
                });

            const listaPesquisas = await AsyncStorage.getItem('CursosPesquisados');
            console.log("Verificando string de listas", listaPesquisas)
            const list = listaPesquisas ? listaPesquisas.split(",") : [palavraChave]
            console.log("lista com pesquisas", list)
            if (!listaPesquisas) {
                console.log("salvando lista inicial", list)
                salvarAsyncStorage(list)
                setLoading(false);
            } else if (!list.find(item => item === palavraChave)) {
                console.log("adicionando novo tema")
                salvarAsyncStorage([...list, palavraChave])
                setLoading(false);
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    };

    async function CarregarCurso() {
        try {
            navigation.navigate('DetalhesCursoTela', { curso: item });
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <View style={styles.basicoLoading}>
                <ActivityIndicator
                    size="large"
                    color="green"
                />
                <Text style={styles.textoLoading}>Aguarde a consulta dos cursos em nossa API</Text>
            </View>
        );
    }
    else {
        return (
            <View style={styles.basico}>
                <View>
                    <View>
                        <TextInput
                            placeholder="Buscar Cursos"
                            placeholderTextColor="#fff"
                            color="#fff"
                            style={{ top: 40, marginStart: 100,paddingTop: 40, width: 220}}
                            onChangeText={setPalavraChave}
                            value={palavraChave}
                        />

                    </View>
                    <View>
                        <Button
                            title=""
                            icon={{
                                name: 'search',
                                type: 'font-awesome',
                                size: 15,
                                color: 'white',
                            }}
                            iconContainerStyle={{ marginRight: 10 }}
                            titleStyle={{ fontWeight: '700' }}
                            buttonStyle={{
                                backgroundColor: 'rgba(90, 154, 230, 1)',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 30,
                                marginLeft: 135                                
                            }}
                            containerStyle={{
                                width: 200,
                                marginHorizontal: 50,
                                marginVertical: 10,
                                marginLeft: 110
                            }}
                            onPress={BuscarCursos}
                            style={{ color: 'white', top: 70, paddingTop: 20, justifyContent: 'flex-end' }}
                            
                        />

                    </View>
                </View>


                <ScrollView style={styles.container}>

                    {data.map((item, index) => (
                        <View key={index}>
                            <Card
                                nome={item.Nome}
                                keywords={item.Keywords}
                                link={item.Link}
                                temaPrincipal={item.TemaPrincipal}
                                urlImagem={item.UrlImagem}
                                CarregarCurso={() => {
                                    navigation.navigate("Detalhes", { curso: item })
                                }}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default PesquisaInicial;