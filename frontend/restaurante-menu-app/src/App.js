import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import CadastroUsuarioScreen from './screens/CadastroUsuarioScreen';
import CadastroItemScreen from './screens/CadastroItemScreen';
import ComandasScreen from './screens/ComandasScreen';
import RelatorioVendasScreen from './screens/RelatorioVendasScreen';
import CopaCozinhaScreen from './screens/CopaCozinhaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} />
        <Stack.Screen name="CadastroItem" component={CadastroItemScreen} />
        <Stack.Screen name="Comandas" component={ComandasScreen} />
        <Stack.Screen name="RelatorioVendas" component={RelatorioVendasScreen} />
        <Stack.Screen name="CopaCozinha" component={CopaCozinhaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
