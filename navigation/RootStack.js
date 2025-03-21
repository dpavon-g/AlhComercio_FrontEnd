import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import OfertasScreen from '../screens/OfertasScreen';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Detalles" component={OfertasScreen} options={{ title: 'Ofertas' }} />
    </Stack.Navigator>
  );
}
