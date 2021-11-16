import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const btnWithIcon = (props) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                props.onPress()
            }} style={styles.box}>
                <Text>{props.titulo}</Text>
                <View style={styles.icone}>
                    {props.children}
                </View>
            </TouchableOpacity >
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        flexDirection: 'row',
        color: 'black',
        borderWidth: 1,
        paddingLeft: 10
    },
    icone: {
        marginHorizontal: 5
    }
})

export default btnWithIcon;
