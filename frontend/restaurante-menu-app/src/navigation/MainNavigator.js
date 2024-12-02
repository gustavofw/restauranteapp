import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroUsuarioScreen from '../screens/CadastroUsuarioScreen';
import CadastroItemScreen from '../screens/CadastroItemScreen';
import ComandasScreen from '../screens/ComandasScreen';
import RelatorioVendasScreen from '../screens/RelatorioVendasScreen';
import CopaCozinhaScreen from '../screens/CopaCozinhaScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="CadastroUsuario" 
          component={CadastroUsuarioScreen} 
          options={{ title: 'Cadastro de Usuários' }} 
        />
        <Stack.Screen 
          name="CadastroItem" 
          component={CadastroItemScreen} 
          options={{ title: 'Cadastro de Itens' }} 
        />
        <Stack.Screen 
          name="Comandas" 
          component={ComandasScreen} 
          options={{ title: 'Gerenciamento de Comandas' }} 
        />
        <Stack.Screen 
          name="RelatorioVendas" 
          component={RelatorioVendasScreen} 
          options={{ title: 'Relatório de Vendas' }} 
        />
        <Stack.Screen 
          name="CopaCozinha" 
          component={CopaCozinhaScreen} 
          options={{ title: 'Copa & Cozinha' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}