import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

const TelaDescricaoCurso = props => {
    return (
        <View style={styles.tela}>
            <Text>Tela base da descrição de um curso</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TelaDescricaoCurso;