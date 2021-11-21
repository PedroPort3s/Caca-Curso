import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Button, View, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../helpers/ConsumoApi';
import styles from './style.js';
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





// export function ConfiguracoesTela({ navigation }) {

//     const [isLoading, setLoading] = useState(true);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         teste();
//     }, []);



//     const teste = async () => {
//         try {
//             const resposta = await API.MakeRequest('https://reactnative.dev/movies.json', 'GET');
//             console.log(resposta.description);
//             setData(resposta.movies);
//         } catch (error) {
//             console.log(error);
//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     // return (
//     //     <View style={styles.basico}>
//     //         {isLoading ? <ActivityIndicator /> : (
//     //             <FlatList style={styles.textosBasicos}
//     //                 data={data}
//     //                 keyExtractor={({ id }, index) => id}
//     //                 renderItem={({ item }) => (
//     //                     <Text onPress={() => navigation.navigate('Pesquisa')} style={styles.textosBasicos}> Filme: {item.title} Ano: {item.releaseYear}</Text>
//     //                 )}
//     //             />
//     //         )}
//     //         <Text style={styles.textosBasicos}>A outra página, clique no grid para voltar ao inicio </Text>
//     //     </View>
//     // );
// }

const Tab = createBottomTabNavigator();

export default function RecomendadosTela({navigation}) {
    return (

        <View style={styles.basico}>
            <Button
                title="Recomendados"
                onPress={() => navigation.navigate('PesquisaInicial')}
            />

        </View>
        // <Tab.Navigator initialRouteName="Configuracoes" screenOptions={({ route }) => ({
        //     tabBarIcon: ({ focused, color, size }) => {
        //         let iconName;

        //         if (route.name === 'Recomendados') {
        //             iconName = focused ? 'md-star' : 'md-star-outline';
        //         } else if (route.name === 'Configuracoes') {
        //             iconName = focused ? 'settings' : 'settings-outline';
        //         } else if (route.name === 'Favoritos') {
        //             iconName = focused ? 'heart' : 'heart-outline';
        //         }

        //         return <Ionicons name={iconName} size={size} color={color} />;
        //     },
        //     tabBarActiveTintColor: '#000',
        //     tabBarInactiveTintColor: '#000',
        // })}
        // >
        //     {/* <Tab.Screen name="Recomendados" component={PesquisaTela} /> */}
        //     <Tab.Screen name="Configuracoes" component={ConfiguracoesTela} />
        //     {/* <Tab.Screen name="Favoritos" component={FavoritosTela} /> */}
        // </Tab.Navigator>
    );
}

