import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import InicialScreen from './screens/InicialScreen';
import AdicionarItemScreen from './screens/AdicionarItemScreen';
import VisualizarItemScreen from './screens/VisualizarItemScreen';
import EditarItemScreen from './screens/EditarItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InicialScreen" component={InicialScreen} />
        <Stack.Screen name="AdicionarItemScreen" component={AdicionarItemScreen} />
        <Stack.Screen name="VisualizarItemScreen" component={VisualizarItemScreen} />
        <Stack.Screen name="EditarItemScreen" component={EditarItemScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
