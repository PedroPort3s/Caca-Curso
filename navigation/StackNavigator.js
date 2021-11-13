import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../src/UI/login";
import PesquisaInicial from "../src/UI/pesquisa";
import Configuracoes from "../src/UI/configuracoes";
import RecomendadosTela from "../src/UI/recomendados";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown: false
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PesquisaInicial" component={PesquisaInicial} />
      <Stack.Screen name="ConfiguracoesTela" component={Configuracoes} />
      <Stack.Screen name="RecomendadosTela" component={RecomendadosTela} />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Configs" component={Configuracoes} />
    </Stack.Navigator>
  );
}

const RecomendadoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Recomendados" component={RecomendadosTela} />
    </Stack.Navigator>
  );
}



export { MainStackNavigator, ContactStackNavigator, RecomendadoStackNavigator };