
import React, { useState, useContext, useEffect } from 'react';
import styles from '../../../assets/styles/styles.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from '../components/card'
import ConfiguracoesTela from '../configuracoes';
import DetalhesCursoTela from '../curso';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [palavraChave, setPalavraChave] = useState('');

    const salvarAsyncStorage = async (lista) => {
        AsyncStorage.setItem('CursosPesquisados', lista.toString())
            .then(() => {
                console.log("salvou tema pesquisado com sucesso")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function BuscarCursos() {
        try {
            const url = 'http://192.168.15.47:3000/curso/pesquisa?p=' + encodeURIComponent(palavraChave);

            console.log(url);

            await axios.get(url).catch((err) => {
                console.log("Erro ao consultar url: " + url, err)
            }).then((response) => {
                setData(response.data.objeto);
            });

            // const resposta = await API.MakeRequest('http://localhost:3000/curso?p=java', 'GET');
            // console.log(resposta);
            // setData(resposta.movies);

            const listaPesquisas = await AsyncStorage.getItem('CursosPesquisados');
            console.log("Verificando string de listas", listaPesquisas)
            const list = listaPesquisas ? listaPesquisas.split(",") : []
            console.log("lista com pesquisas", list)
            if (!listaPesquisas) {
                console.log("salvando lista inicial")
                salvarAsyncStorage(list)
            } else if (!list.find(item => item === palavraChave)) {
                console.log("adicionando novo tema")
                salvarAsyncStorage([...list, palavraChave])
            }

        } catch (error) {
            console.log(error);
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

    return (


        <View style={styles.basico}>
            {/* <Text style={styles.textosBasicos}>Inicio</Text> */}
            {/* <SearchBarCustom
                placeholder="Pesquisa de Cursos"
                platform="android"
                style={InputFieldsStyle}
                {...dummySearchBarProps}
                {...{ marginTop: 80 }}
            /> */}
            <TextInput
                placeholder="Buscar Cursos"
                placeholderTextColor="#fff"
                style={{ top: 40, paddingTop: 40 }}
                onChangeText={setPalavraChave}
                value={palavraChave}
            />


            <Button
                title="Buscar"
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
                    marginTop: 50
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={BuscarCursos}
                style={{ color: 'white', top: 70, paddingTop: 20 }}
            />

            {/* {isLoading ? <ActivityIndicator /> : (
                <FlatList style={{ color: 'white', top: 50 }}
                    data={data}
                    keyExtractor={item => item.link}
                    renderItem={({ item }) => (
                        <Text style={styles.textosBasicos}> Curso: {item.nome} Link: {item.link}</Text>
                    )}
                />
            )} */}

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

            {/* <Tab.Navigator initialRouteName="Pesquisas" screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Recomendados') {
                        iconName = focused ? 'md-star' : 'md-star-outline';
                    } else if (route.name === 'Configuracoes') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Favoritos') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#000',
            })}
            >
                <Tab.Screen name="Configuracoes" component={ConfiguracoesTela} />
            </Tab.Navigator> */}
        </View>
        /*       <View style={styles.basico}>
                   <Text style={styles.textosBasicos} onPress={() => navigation.navigate('ConfiguracoesTela')}>A outra página, clique no grid para voltar ao inicio </Text>
       
                   
       {
                   <Tab.Navigator initialRouteName="Pesquisas" screenOptions={({ route }) => ({
                       tabBarIcon: ({ focused, color, size }) => {
                           let iconName;
       
                           if (route.name === 'Recomendados') {
                               iconName = focused ? 'md-star' : 'md-star-outline';
                           } else if (route.name === 'Configuracoes') {
                               iconName = focused ? 'settings' : 'settings-outline';
                           } else if (route.name === 'Favoritos') {
                               iconName = focused ? 'heart' : 'heart-outline';
                           }
       
                           return <Ionicons name={iconName} size={size} color={color} />;
                       },
                       tabBarActiveTintColor: '#000',
                       tabBarInactiveTintColor: '#000',
                   })}
                   >
                       <Tab.Screen name="Configuracoes" component={ConfiguracoesTela2} onPress={() => navigation.navigate('ConfiguracoesTela')} />
                   </Tab.Navigator> }
               </View>*/
    );
}

export default PesquisaInicial;





