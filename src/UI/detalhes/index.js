import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import h from '../../helpers/ConsumoApi'

import IconAntDesign from '../components/iconAntDesign'
import IconIonicons from '../components/iconIonicons'
import BtnWithIcon from '../components/btnWithIcon'
import Comentario from '../components/comentario'

import { getUsuarioLogado } from '../../helpers/UsuarioLogado'
import { useIsFocused } from '@react-navigation/core';
import { TextInput } from 'react-native-gesture-handler';

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
    const [usuarioLogado, setUsuarioLogado] = useState({});
    const [avaliacaoGeral, setAvaliacaoGeral] = useState({});
    const [comentario, setComentario] = useState("");
    const [, forceUpdate] = useState()
    const [idCurso, setIdCurso] = useState();
    const [like, setLike] = useState();
    const [dislike, setDislike] = useState();

    useEffect(() => {
        console.log("Curso que chegou na detalhes: ", newCurso)
        verificaUsuario()
        // verificarFavorito()
    }, []);

    useEffect(() => {
        verificaUsuario()
        verificarFavorito()
    }, [idCurso]);

    const isFocused = useIsFocused()

    useEffect(() => {
        verificaCurso(newCurso.Link);
        console.log("verificando variaveis useState")
        console.log("curso: ", idCurso)
    }, [isFocused])

    const verificaCurso = async (curso_link) => {
        console.log("link do curso: ", curso_link);
        try {
            const url = `${h.urlApi}/curso/link?link=` + curso_link;

            console.log(url);

            await axios.get(url).then((response) => {
                console.log('Data da consulta por link: ', response.data.objeto);
                if (response.data.objeto) {
                    setLike(response.data.objeto.Like)
                    setDislike(response.data.objeto.Dislike)
                    console.log("novo curso: ", response.data.objeto)
                    setIdCurso(response.data.objeto.id)
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
        const url = `${h.urlApi}/curso`;

        console.log("curso que será criado: ", newCurso)

        axios.post(url, {
            curso: newCurso
        }).then((response) => {
            console.log('objeto do create: ', response.data.objeto);
            setIdCurso(response.data.objeto.id)
            verificaLikes()
        }).catch((err) => {
            console.log("Erro ao consultar url: " + url, err)
        });
    }

    const verificaUsuario = async () => {
        const usuarioLogadoJson = await getUsuarioLogado()
        const usuarioLogadoObj = JSON.parse(usuarioLogadoJson)
        console.log("Usuario logado: ", usuarioLogadoObj)
        setUsuarioLogado(usuarioLogadoObj.json)
        if (usuarioLogadoObj) {
            const url = `${h.urlApi}/avaliacaogeral/cursousuario?curso_id=` + idCurso + "&usuario_id=" + usuarioLogadoObj.json.usuarioIdBanco;

            console.log("Usuario sendo verificado e id do curso: ", usuarioLogadoObj.json, " e ", idCurso)

            axios.get(url).then((response) => {
                console.log('Avalicao retornada: ', response.data.objeto);
                setAvaliacaoGeral(response.data.objeto)
            }).catch((err) => {
                console.log("Erro ao procurar: ", err)
                console.log("Erro ao procurar: ", url)
                if (err.response.status === 404) {
                    console.log("Nenhuma avaliação encontrada!")
                } else {
                    console.log("Erro ao consultar url: " + url, err.response)
                }
            });
        }
    }

    ///////quando da um like, ela altera a variavel para um array de numero, o que força ela a criar novamente, pensar antes de fazer a logica amanha

    const [cursoFavoritado, setCursoFavoritado] = useState({});

    const verificarFavorito = () => {
        let url = "http://192.168.1.103:3000/usuariofavoritos/cursousuario?curso_id=" + idCurso + "&usuario_id=" + usuarioLogado.usuarioIdBanco
        console.log("Favorito salvo", cursoFavoritado)
        console.log("Url completa", url)
        console.log("Id do favorito: ", cursoFavoritado)
        axios.get(url).then((response) => {
            console.log("deu certo a busca ", response.data.mensagem)
            console.log("Favorito encontrado ", response.data.objeto)
            setCursoFavoritado(response.data.objeto)
        }).catch((err) => {
            if (err.response.status === 404) {
                console.log("Nenhum favorito encontrado!")
            } else {
                console.log("Erro ao consultar url: " + url, err)
            }
        });
    }

    const favoritarCurso = () => {
        let url = "http://192.168.1.103:3000/usuariofavoritos"
        console.log("Favorito salvo", cursoFavoritado)
        if (cursoFavoritado && cursoFavoritado.id) {
            url = url + "/id/" + cursoFavoritado.id
            console.log("Url completa", url)
            console.log("Id do favorito: ", cursoFavoritado)
            axios.delete(url).then((response) => {
                console.log("deu certo o delete", response.data.mensagem)
                console.log("Favorito deletado", response.data.objeto)
                setCursoFavoritado({})
            }).catch((err) => {
                if (err.response.status === 404) {
                    console.log("Nenhuma avaliação encontrada!")
                } else {
                    console.log("Erro ao consultar url: " + url, err)
                }
            });
        } else {
            console.log("Url completa", url)
            console.log("Usuario logado no create", usuarioLogado)
            console.log("Novo favorito sendo criado com o curdo id:", newCurso.id, " e usuario id: ", usuarioLogado.usuarioIdBanco)
            axios.post(url,
                {
                    Curso_id: idCurso,
                    Usuario_id: usuarioLogado.usuarioIdBanco,
                }).then((response) => {
                    console.log("deu certo com o create: ", response.data.mensagem)
                    console.log("favorito criado: ", response.data.objeto)
                    setCursoFavoritado(response.data.objeto)
                }).catch((err) => {
                    if (err.response.status === 404) {
                        console.log("Url não encontrada!")
                    } else {
                        console.log("Erro ao consultar url: " + url, err.response)
                    }
                });
        }
    }

    const darAvaliacao = (like_dislike) => {
        let url = `${h.urlApi}/avaliacaogeral`;

        console.log("Avaliação geral salva", avaliacaoGeral)
        if (avaliacaoGeral && avaliacaoGeral.id) {
            console.log("Url completa", url)
            console.log("Id da avaliação", avaliacaoGeral)
            axios.put(url,
                {
                    AvaliacaoGeral: like_dislike,
                    AvaliacaoGeralId: avaliacaoGeral.id,
                }).then((response) => {
                    console.log("deu certo o update", response.data.mensagem)
                    console.log("avaliação atualizada", response.data.objeto)
                    setAvaliacaoGeral({ ...avaliacaoGeral, AvaliacaoGeral: like_dislike })
                    verificaLikes()
                }).catch((err) => {
                    if (err.response.status === 404) {
                        console.log("Nenhuma avaliação encontrada!")
                    } else {
                        console.log("Erro ao consultar url: " + url, err)
                    }
                });
        } else {
            console.log("Url completa", url)
            console.log("Usuario logado no create", usuarioLogado)
            console.log("Novo curso sendo criado", newCurso)
            axios.post(url,
                {
                    Curso_id: idCurso,
                    Usuario_id: usuarioLogado.usuarioIdBanco,
                    AvaliacaoGeral: like_dislike
                }).then((response) => {
                    console.log("deu certo com o create", response.data.mensagem)
                    console.log("avaliação criada", response.data.objeto)
                    setAvaliacaoGeral(response.data.objeto)
                    verificaLikes()
                }).catch((err) => {
                    if (err.response.status === 404) {
                        console.log("Url não encontrada!")
                    } else {
                        console.log("Erro ao consultar url: " + url, err.response)
                    }
                });
        }
    }

    const PostarComentario = (comentario) => {
        let url = `${h.urlApi}/avaliacaogeral`;

        axios.post().then((response) => {

        })
            .catch((error) => {
                alert(error.message);
            });
    }

    const retirarAvaliacao = () => {
        axios.get(url).then((response) => {

        }).catch((err) => {
            if (err.response.status === 404) {
                console.log("Nenhuma avaliação encontrada!")
            } else {
                console.log("Erro ao consultar url: " + url, err.response)
            }
        });
    }

    const verificaLikes = async () => {
        let url = `${h.urlApi}/avaliacaogeral/getlikes?curso_id=` + idCurso

        console.log("Verificando Likes e dislikes: ", like, " e ", dislike)

        axios.get(url).then((response) => {
            console.log("buscou os likes: ", response.data.mensagem)
            console.log("likes pegados: ", response.data.objeto)
            setLike(response.data.objeto.Like)
            setDislike(response.data.objeto.Dislike)
            forceUpdate()
        }).catch((err) => {
            if (err.response.status === 404) {
                console.log("Url não encontrada!")
            } else {
                console.log("Erro ao consultar url: " + url, err.response)
            }
        });
    }

    const viewIconLike = () => {
        if (avaliacaoGeral && avaliacaoGeral.AvaliacaoGeral !== null) {
            if (avaliacaoGeral.AvaliacaoGeral) {
                return <IconAntDesign icon='like1' size={50} />
            } else {
                return <IconAntDesign icon='like2' size={50} />
            }
        } else {
            return <IconAntDesign icon='like2' size={50} />
        }
    }

    const viewIconDislike = () => {
        if (avaliacaoGeral && avaliacaoGeral.AvaliacaoGeral !== null) {
            if (avaliacaoGeral.AvaliacaoGeral) {
                return <IconAntDesign icon='dislike2' size={50} />
            } else {
                return <IconAntDesign icon='dislike1' size={50} />
            }
        } else {
            return <IconAntDesign icon='dislike2' size={50} />
        }
    }

    const viewIconFavorito = () => {
        console.log("curso favorito: ", cursoFavoritado)
        if (cursoFavoritado && cursoFavoritado.id) {
            return <IconIonicons icon='heart-dislike' size={30} />
        } else {
            return <IconIonicons icon='heart' size={30} />
        }
    }

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
                        {newCurso.Nome}
                    </Text>
                    <Text
                        style={styles.box}
                        numberOfLines={6}
                    >
                        {newCurso.Descricao}
                    </Text>
                    <View style={styles.likeContainer}>
                        <TouchableOpacity style={styles.likeBox}
                            onPress={() => {
                                darAvaliacao(true)
                                console.log("Like pressionado")
                            }}
                        >
                            {viewIconLike()}
                            <Text style={{ marginTop: 10 }}>
                                {like ? like : 0}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.likeBox}
                            onPress={() => {
                                darAvaliacao(false)
                                console.log("Dislike pressionado")
                            }}
                        >
                            {viewIconDislike()}
                            <Text style={{ marginTop: 10 }}>
                                {console.log("verificando avaliacaoGeral: ", avaliacaoGeral)}
                                {dislike ? dislike : 0}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.acoesContainer}>
                        <BtnWithIcon
                            onPress={() => {
                                favoritarCurso()
                                console.log('favoritar pressionado')
                            }}
                            titulo='Favoritar'>
                            {viewIconFavorito()}
                        </BtnWithIcon>
                        <BtnWithIcon
                            onPress={() => {
                                console.log('Ver curso pressionado')
                                Linking.openURL(newCurso.Link);
                            }}
                            titulo='Ver curso'>
                            <IconIonicons icon='arrow-forward-circle' size={30} />
                        </BtnWithIcon>
                    </View>

                    <View style={styles.container}>
                        <TextInput style={styles.box} numberOfLines={6} multiline onChangeText={setComentario}></TextInput>
                        <BtnWithIcon
                            onPress={() => {
                                PostarComentario(comentario);
                            }}
                            titulo='Postar'>
                            <IconIonicons icon='arrow-forward-circle' size={30} />
                        </BtnWithIcon>
                    </View>

                    <View style={styles.comentarioContainer}>
                        <Text>Comentários</Text>
                        {newCurso.listComentarios ?
                            <Text style={{ ...styles.box, ...styles.title }}>
                                Sem Avaliações
                            </Text>
                            : null}
                        <ScrollView>
                            {
                                newCurso.listComentarios ? newCurso.listComentarios.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <Comentario obj={item} />
                                        </View>
                                    )
                                }) : <Text style={{ ...styles.box, ...styles.title }}>Sem Avaliações</Text>
                            }
                        </ScrollView>
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
    inputComentarioContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputComentario: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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