import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function CadastroItemScreen() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  const cadastrarItem = async () => {
    try {
      const response = await api.post('/itens', { nome, preco });
      if (response.status === 201) {
        Alert.alert('Sucesso', `Item ${response.data.nome} cadastrado com sucesso!`);
        setNome('');
        setPreco('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o item.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Item"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <Button title="Cadastrar Item" onPress={cadastrarItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
