import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, StatusBar, SectionList, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Icon from '../components/iconAntDesign'
import Comentario from '../components/comentario'

console.log('renderizou')

const props = {
    funcaoVerificaBanco: () => {
        console.log('aqui pode ser um local para armazenar a função parar verificar no banco,' +
            'tem de ter um controle de quando será executada')
    },
    titulo: 'titulo',
    descricao: "Descrição do curso _________________________ Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    listComentarios: [
        {
            id: 1,
            nomeAuthor: 'Vitor',
            comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        },
        {
            id: 2,
            nomeAuthor: 'Carlos',
            comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        },
        {
            id: 3,
            nomeAuthor: 'Cleyton',
            comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        },
    ]
}

// dai tem de brincar com o props depois, n sei daonde vira os dados então vou pressupor que estão vindo do props
// opa, acabei de perceber que iremos consumir da nossa propria api, saco
// const Detalhes = (props) => {
const Detalhes = () => {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{ ...styles.box, ...styles.title }} >
                        Titulo do curso
                    </Text>
                    <Text
                        style={styles.box}
                        numberOfLines={6}
                    >
                        {props.descricao}
                    </Text>
                    <View style={styles.likeContainer}>
                        <View style={styles.likeBox}>
                            <Icon icon='like1' size={50} />
                            <Text style={{ marginTop: 10 }}>999</Text>
                        </View>
                        <View style={styles.likeBox}>
                            <Icon icon='dislike1' size={50} />
                            <Text style={{ marginTop: 10 }}>999</Text>
                        </View>
                    </View>
                    <View style={styles.comentarioContainer}>
                        <ScrollView style={{ flex: 1, height: '100%', width: '100%' }}>
                            {
                                props.listComentarios.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <Comentario obj={item} />
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.acoesContainer}>
                        <Text>Favoritar e ver curso</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    likeContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '70%',
    },
    comentarioContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 30,
        width: '100%',
        height: '100%'
    },
    acoesContainer: {
        flex: 1
    },
    likeBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        color: 'black',
        borderWidth: 1,
        padding: 10,
    },
    title: {
        flex: 1,
        width: '100%',
        height: 40,
        marginBottom: 5,
    }
})

export default Detalhes;