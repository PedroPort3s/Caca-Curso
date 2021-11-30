import React from 'react'
import { View, StyleSheet, Image, Text, Linking } from 'react-native'
import { Button } from 'react-native-elements'

const Card = (props) => {

    const urlImagem = props.urlImagem ? props.urlImagem : 'https://brasilpaisdigital.com.br/wp-content/uploads/2020/03/online-gratuitos.png'

    return (
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image
                    style={styles.imgCurso}
                    source={{
                        uri: urlImagem,
                    }}
                />
            </View>
            <View style={styles.containerDesc}>
                <Text style={styles.title}>{props.nome}</Text>
                <Text style={styles.temaPrincipal}>{props.temaPrincipal}</Text>
                <Button
                    style={styles.btn}
                    // onPress={() => Linking.openURL(props.link)}
                    onPress={() => props.CarregarCurso()}
                    title="Acessar curso"
                    color="#841584"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        width: 300,
        flexDirection: 'row',
    },
    title: {
        color: 'white',
        fontSize: 15,
    },
    temaPrincipal: {
        color: 'white',
        fontSize: 10,
    },
    containerImg: {
        height: 100,
        width: 100
    },
    containerDesc: {
        width: '80%',
        height: 100,
        marginStart: 10,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    imgCurso: {
        height: 100,
        width: 100
    },
    btn: {
        width: '70%'
    }
})

export default Card;