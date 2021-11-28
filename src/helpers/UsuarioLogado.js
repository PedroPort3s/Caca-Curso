import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUsuarioLogado = async () => {
    const usuarioLogado = await AsyncStorage.getItem('CacaCursoCredentials');
    return usuarioLogado
}