import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Sistema de Restaurante</Text>
      <Link href="/CadastroUsuarioScreen" style={styles.button}>
        Ir para o cadastro de usuários
      </Link>
      <Link href="/CadastroItemScreen" style={styles.button}>
        Ir para o cadastro de itens
      </Link>
      <Link href="/ComandasScreen" style={styles.button}>
        Ir para as comandas
      </Link>
      <Link href="/CopaCozinhaScreen" style={styles.button}>
        Ir para a copa e cozinha
      </Link>
      <Link href="/LoginScreen" style={styles.button}>
        Ir para o login
      </Link>
      <Link href="/RelatoriosVendaScreen" style={styles.button}>
        Ir para os relatórios de vendas
      </Link>
      <Link href="/sobre" style={styles.button}>
        Sobre
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FF7F00',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    alignSelf: 'flex-start', 
    padding: 'auto'
  },
  button: {
    marginVertical: 10,
    fontSize: 20,
    color: '#fff',
  },
});
