import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function MainMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Cadastro de Usuários" onPress={() => navigation.navigate('CadastroUsuario')} />
      <Button title="Cadastro de Itens" onPress={() => navigation.navigate('CadastroItem')} />
      <Button title="Gerenciamento de Comandas" onPress={() => navigation.navigate('Comandas')} />
      <Button title="Relatório de Vendas" onPress={() => navigation.navigate('RelatorioVendas')} />
      <Button title="Copa e Cozinha" onPress={() => navigation.navigate('CopaCozinha')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
