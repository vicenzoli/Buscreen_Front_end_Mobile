import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LinhasScreen from './LinhasScreen';
import CadastroOnibusScreen from './CadastroOnibusScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Linhas" component={LinhasScreen} />
        <Stack.Screen name="Linhas" component={CadastroOnibusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;