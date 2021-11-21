import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator, RecomendadoStackNavigator, FavoritoStackNavigator} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>     
      <Tab.Screen name="Pesquisa" component={MainStackNavigator} />
      <Tab.Screen name="Favoritos" component={FavoritoStackNavigator} />
      <Tab.Screen name="Configuracoes" component={ContactStackNavigator} />
      <Tab.Screen name="Recomendados" component={RecomendadoStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;


  // screenOptions={({ route }) => ({
  //       tabBarIcon: ({ focused, color, size }) => {
  //         let iconName;
  
  //         if (route.name === 'Recomendados') {
  //           iconName = focused ? 'md-star' : 'md-star-outline';
  //         } else if (route.name === 'Configuracoes') {
  //           iconName = focused ? 'settings' : 'settings-outline';
  //         } else if (route.name === 'Favoritos') {
  //           iconName = focused ? 'heart' : 'heart-outline';
  //         }
  
  //         return <Ionicons name={iconName} size={size} color={color} />;
  //       },
  //       tabBarActiveTintColor: '#000',
  //       tabBarInactiveTintColor: '#000',
  //     })}