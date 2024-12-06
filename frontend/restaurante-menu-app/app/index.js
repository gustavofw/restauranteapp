import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';

const PlaceholderImage = require('@/assets/images/telafundo.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Sistema de Restaurante</Text>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={PlaceholderImage} style={styles.image} />
        </View>
      </View>
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
    padding: 20,
    backgroundColor: '#FF7F00',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
   image: {
    width: 1500,
    height: 500,
    borderRadius: 18,
    opacity: 0.2,
   },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    alignSelf: 'flex-start', 
    padding: 'auto',
  },
  button: {
    marginVertical: 10,
    fontSize: 27,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start', 
    padding: 'auto',
    marginBottom: '20px',
  },
});
