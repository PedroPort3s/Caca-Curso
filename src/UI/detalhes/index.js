import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';

import IconAntDesign from '../components/iconAntDesign'
import IconIonicons from '../components/iconIonicons'
import BtnWithIcon from '../components/btnWithIcon'
import Comentario from '../components/comentario'

console.log('renderizou')

// const navigation = {
//     params: {
//         funcaoVerificaBanco: () => {
//             console.log('aqui pode ser um local para armazenar a função parar verificar no banco,' +
//                 'tem de ter um controle de quando será executada')
//         },
//         titulo: 'titulo',
//         descricao: "Descrição do curso _________________________ Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
//         like: 543,
//         dislike: 555,
//         listComentarios: [
//             {
//                 id: 1,
//                 nomeAuthor: 'Vitor',
//                 comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//             },
//             {
//                 id: 2,
//                 nomeAuthor: 'Carlos',
//                 comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//             },
//             {
//                 id: 3,
//                 nomeAuthor: 'Cleyton',
//                 comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//             },
//             {
//                 id: 3,
//                 nomeAuthor: 'Cleyton',
//                 comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//             },
//             {
//                 id: 3,
//                 nomeAuthor: 'Cleyton',
//                 comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//             },
//             {
//                 id: 3,
//                 nomeAuthor: 'Cleyton',
//                 comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//             },
//             {
//                 id: 3,
//                 nomeAuthor: 'Cleyton',
//                 comentario: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//             },
//         ]
//     }
// }

// dai tem de brincar com o props depois, n sei daonde vira os dados então vou pressupor que estão vindo do props
// opa, acabei de perceber que iremos consumir da nossa propria api, saco
// const Detalhes = ({route}) => {

const Detalhes = (props) => {

    let newCurso = props.route.params.curso

    onScreenLoad = async () => {
        console.log("Caiu na função de load da página de configurações");
        try {
            validarBotoes();
        } catch (error) {
            console.log(error);
        }
    }

    const [curso, setCurso] = useState(newCurso);

    console.log("Curso: ", curso);

    const verificaCurso = async (curso_link) => {
        console.log("link do curso: ", curso_link);
        try {
            const url = 'http://192.168.1.103:3000/curso/link';

            console.log(url);

            await axios.get(url, {
                params: {
                    link: curso_link
                }
            }).then((response) => {
                console.log('Data da consulta por link: ', response.data.objeto);
                if (response.data.objeto) {
                    setCurso(response.data.objeto)
                } else {
                    createNewCurso()
                }
            }).catch((err) => {
                console.log("Erro ao consultar url: " + url, err)
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            // setIsLoading(false);
        }
    };

    const createNewCurso = () => {
        const url = 'http://192.168.1.103:3000/curso';

        console.log("curso que será criado: ", curso)

        axios.post(url, {
            curso: curso
        }).then((response) => {
            console.log('objeto do create: ', response.data.objeto);
            setCurso(response.data.objeto);
        }).catch((err) => {
            console.log("Erro ao consultar url: " + url, err)
        });
    }

    useEffect(() => {
        console.log("Curso que chegou na detalhes: ", newCurso)
        verificaCurso(newCurso.Link);
    }, []);

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <View style={styles.container}>
                    <Text style={{ ...styles.box, ...styles.title }} >
                        {curso.Nome}
                    </Text>
                    <Text
                        style={styles.box}
                        numberOfLines={6}
                    >
                        {curso.Keywords}
                    </Text>
                    <View style={styles.likeContainer}>
                        <View style={styles.likeBox}>
                            <IconAntDesign icon='like1' size={50} />
                            <Text style={{ marginTop: 10 }}>
                                {curso.Like ? curso.Like : 0}
                            </Text>
                        </View>
                        <View style={styles.likeBox}>
                            <IconAntDesign icon='dislike1' size={50} />
                            <Text style={{ marginTop: 10 }}>
                                {curso.Dislike ? curso.Dislike : 0}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.comentarioContainer}>
                        <Text>Comentários</Text>
                        {curso.listComentarios ?
                            <Text style={{ ...styles.box, ...styles.title }}>
                                Sem Avaliações
                            </Text>
                            : null}
                        <ScrollView>
                            {
                                curso.listComentarios ? curso.listComentarios.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <Comentario obj={item} />
                                        </View>
                                    )
                                }) : <Text style={{ ...styles.box, ...styles.title }}>Sem Avaliações</Text>
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.acoesContainer}>
                        <BtnWithIcon
                            onPress={() => {
                                console.log('favoritar pressionado')
                            }}
                            titulo='Favoritar'>
                            <IconIonicons icon='heart-circle' size={30} />
                        </BtnWithIcon>
                        <BtnWithIcon
                            onPress={() => {
                                console.log('Ver curso pressionado')
                            }}
                            titulo='Ver curso'>
                            <IconIonicons icon='arrow-forward-circle' size={30} />
                        </BtnWithIcon>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

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
        height: '70%',
        alignItems: 'center'
    },
    acoesContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center'
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