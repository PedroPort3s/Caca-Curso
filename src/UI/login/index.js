import * as GoogleLogin from 'expo-google-app-auth';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { Button } from 'react-native';

const mensagemRetorno = (mensagem, tipo = 'FAILED') => {
    setMessage(mensagem);
    setMessageType(tipo);
};

const Login = ({ navigation }) => {
    const [googleSubmitting, settGoogleSubmitting] = useState(false);
}



const googleLogin = () => {
    settGoogleSubmitting(true);
    const config = {
        androidClientId: '123256132157-h8hgctq206mcta0a35bplb4ocnj855on.apps.googleusercontent.com',
        scopes: ['profile', 'email']
    };

    GoogleLogin
        .logInAsync(config)
        .then((result) => {
            const { type, user } = result;

            if (type == 'success') {
                const { email, name, photoUrl } = user;
                mensagemRetorno('Login via Google efetuado com sucesso', 'SUCCESS');
                setTimeout(() => navigation.navigate('', { email, user, photoUrl }), 1000);
            } else {
                mensagemRetorno('Login com o Google cancelado pelo usuário');
            }
            settGoogleSubmitting(false);

        })
        .catch(error => {
            console.log(error);
            mensagemRetorno('Houve um erro ao tentar executar o processo de login com o Google');
            settGoogleSubmitting(false);
        })
};



return (
    <View style={styles.basico}>
        <Text style={styles.textosBasicos}>Página Inicial</Text>
            <Button onPress={googleLogin}>Login Google </Button>
    </View>
);

