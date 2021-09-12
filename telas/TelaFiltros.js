import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

const TelaFiltros = props => {
    return (
        <View style={styles.tela}>
            <Text>Tela base de filtros aplicaveis ao curso</Text>
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

export default TelaFiltros;