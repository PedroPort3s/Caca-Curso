import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator, RecomendadoStackNavigator, FavoritoStackNavigator } from "./StackNavigator";

import IconAntDesign from '../src/UI/components/iconAntDesign'
import IconFontAwesome5 from '../src/UI/components/iconFontAwesome5'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'PesquisaInicial') {
      return false;
    }

    return true;
  }

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Pesquisa') {
          if (focused) {
            return <IconAntDesign icon="search1" size={size} style={{}} />;
          } else {
            return <IconAntDesign icon="search1" size={size} style={{}} />;
          }
        }

        else if (route.name === 'Favoritos') {
          if (focused) {
            return <IconAntDesign icon="heart" size={size} style={{}} />;
          }
          else {
            return <IconAntDesign icon="hearto" size={size} style={{}} />;
          }
        }

        else if (route.name === 'Configuracoes') {
          if (focused) {
            return <IconAntDesign icon="tool" size={size} style={{}} />;
          }
          else {
            return <IconAntDesign icon="tool" size={size} style={{}} />;
          }
        }

        else if (route.name === 'Recomendados') {
          if (focused) {
            return <IconAntDesign icon="star" size={size} style={{}} />;
          }
          else {
            return <IconAntDesign icon="staro" size={size} style={{}} />;
          }
        }
      },
      headerShown: false,
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Pesquisa"
        component={MainStackNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route)
        })} />
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