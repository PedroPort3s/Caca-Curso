import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator, RecomendadoStackNavigator, FavoritoStackNavigator } from "./StackNavigator";

import IconAntDesign from '../src/UI/components/iconAntDesign'
import IconFontAwesome5 from '../src/UI/components/iconFontAwesome5'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Pesquisa') {
          if (focused) {
            return <IconFontAwesome5 icon="search" size={size} style={{}} />;
          } else {
            return <IconAntDesign icon="search1" size={size} style={{}} />;
          }
        } else if (route.name === 'Favoritos') {
          return <IconAntDesign icon="search1" size={size} style={{}} />;
        }

        return <IconAntDesign icon="search1" size={size} style={{}} />;
      },
      headerShown: false,
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
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