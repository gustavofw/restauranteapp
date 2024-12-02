import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CadastroItemScreen() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [itens, setItens] = useState([]);

  const cadastrarItem = async () => {
    try {
      const response = await axios.post('http://localhost:3000/itens', {
        nome,
        preco,
      });
      alert(`Item ${response.data.nome} cadastrado com sucesso!`);
      carregarItens();
    } catch (error) {
      alert('Erro ao cadastrar item');
    }
  };

  const carregarItens = async () => {
    try {
      const response = await axios.get('http://localhost:3000/itens');
      setItens(response.data);
    } catch (error) {
      alert('Erro ao carregar itens');
    }
  };

  useEffect(() => {
    carregarItens();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Itens</Text>
      <TextInput placeholder="Nome do Item" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Preço" value={preco} onChangeText={setPreco} style={styles.input} />
      <Button title="Cadastrar" onPress={cadastrarItem} />
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.nome} - R$ {item.preco}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});