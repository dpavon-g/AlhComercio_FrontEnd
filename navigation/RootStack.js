import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import OfertasScreen from '../screens/OfertasScreen';
import LoginScreen from '../screens/LoginScreen';
import SingUpScreen from '../screens/SingUpScreen';
import EnterScreen from '../screens/EnterScreen';
import FormularioNegocioScreen from '../screens/FormularioNegocioScreen.js';
import FormularioOfertaScreen from '../screens/FormularioOfertaScreen.js'

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator  initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SingUpScreen" component={SingUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EnterScreen" component={EnterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Detalles" component={OfertasScreen} options={{ title: 'Ofertas' }} />
      <Stack.Screen name="FormularioNegocioScreen" component={FormularioNegocioScreen} options={{ title: 'Nuevo comercio' }} />
      <Stack.Screen name="FormularioOfertaScreen" component={FormularioOfertaScreen} options={{ title: 'Nueva oferta' }} />
    </Stack.Navigator>
  );
}
