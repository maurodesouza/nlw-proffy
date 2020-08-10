import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return fontsLoaded ? (
    <>
      <AppStack />
      <StatusBar style="light" backgroundColor="#8257E5"/>
    </>
  ) : <AppLoading />;
}
