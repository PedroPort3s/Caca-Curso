import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

const TelaListaCursos = props => {
    return (
        <View style={styles.tela}>
            <Text>Tela base da listagem de cursos</Text>
            <Button title="Vá para descrição" onPress={() => {
                props.navigation.navigate({ routeName: 'DescricaoCurso'});
            }} />
            <Button title="Vá para filtro" onPress={() => {
                props.navigation.navigate({ routeName: 'Filtros'});
            }} />
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

export default TelaListaCursos;