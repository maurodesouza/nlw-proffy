import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../Pages/Landing';
import GiveClasses from '../Pages/GiveClasses';
import AppTab from './AppTab';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
      <Screen name="GiveClasses" component={GiveClasses} />
      <Screen name="Study" component={AppTab} />
    </Navigator>
  </NavigationContainer>
);

export default AppStack;