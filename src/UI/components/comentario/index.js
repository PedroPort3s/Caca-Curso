import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Comentario = (props) => {
    console.log("componente props.comentario ", props.obj);

    return (
        <View style={styles.container}>
            <Text style={{ ...styles.box, ...styles.text }} >
                {props.obj.Usuario.Nome}
            </Text>
            <Text multiline style={{ ...styles.box, ...styles.text }} >
                {props.obj.Comentario}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    box: {
        color: 'black',
        borderWidth: 1,
        padding: 10,
    },
    text: {
        flex: 1,
        width: '100%',
        marginBottom: 5,
    }
})

export default Comentario;