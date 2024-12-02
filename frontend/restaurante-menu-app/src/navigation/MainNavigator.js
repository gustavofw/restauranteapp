import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import CadastroUsuarioScreen from '../screens/CadastroUsuarioScreen';
import CadastroItemScreen from '../screens/CadastroItemScreen';
import ComandasScreen from '../screens/ComandasScreen';
import LoginScreen from '../screens/LoginScreen';
import GerenciamentoComandasScreen from '../screens/GerenciamentoComandasScreen';
import CopaCozinhaScreen from '../screens/CopaCozinhaScreen';
import RelatorioVendasScreen from '../screens/RelatorioVendasScreen';

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
          options={{ title: 'Tela Inicial' }} 
        />
        <Stack.Screen 
          name="CadastroUsuario" 
          component={CadastroUsuarioScreen} 
          options={{ title: 'Cadastro de Usuário' }} 
        />
        <Stack.Screen 
          name="CadastroItem" 
          component={CadastroItemScreen} 
          options={{ title: 'Cadastro de Item' }} 
        />
        <Stack.Screen 
          name="Comandas" 
          component={ComandasScreen} 
          options={{ title: 'Comandas' }} 
        />
        <Stack.Screen 
          name="GerenciamentoComandas" 
          component={GerenciamentoComandasScreen} 
          options={{ title: 'Gerenciamento de Comandas' }} 
        />
        <Stack.Screen 
          name="CopaCozinha" 
          component={CopaCozinhaScreen} 
          options={{ title: 'Copa e Cozinha' }} 
        />
        <Stack.Screen 
          name="RelatorioVendas" 
          component={RelatorioVendasScreen} 
          options={{ title: 'Relatório de Vendas' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
