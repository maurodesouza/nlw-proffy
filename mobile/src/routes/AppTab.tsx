import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import Favorites from '../Pages/Favorites';
import TeacherList from '../Pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

const AppTab: React.FC = () => (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },

        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },

        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },

        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },

        inactiveBackgroundColor: '#FAFAFC',
        inactiveTintColor: '#C1BCCC',

        activeBackgroundColor: '#EBEBF5',
        activeTintColor: '#32264D',
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) =>
            (<Ionicons name="ios-easel" color={focused ? '#8257E5' : color} size={size} />)
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) =>
            (<Ionicons name="ios-heart" color={focused ? '#8257E5' : color} size={size} />)
        }}
      />
    </Navigator>
);

export default AppTab;
