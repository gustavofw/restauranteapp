import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Sistema de Restaurante</Text>
      <Button
        title="Cadastro de Usuário"
        onPress={() => navigation.navigate('CadastroUsuario')}
      />
      <Button
        title="Cadastro de Item"
        onPress={() => navigation.navigate('CadastroItem')}
      />
      <Button
        title="Gerenciamento de Comandas"
        onPress={() => navigation.navigate('GerenciamentoComandas')}
      />
      <Button
        title="Copa e Cozinha"
        onPress={() => navigation.navigate('CopaCozinha')}
      />
      <Button
        title="Relatório de Vendas"
        onPress={() => navigation.navigate('RelatorioVendas')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
