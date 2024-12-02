import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ComandasScreen() {
  const [comandas, setComandas] = useState([]);

  const carregarComandas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/comandas');
      setComandas(response.data);
    } catch (error) {
      alert('Erro ao carregar comandas');
    }
  };

  const adicionarComanda = async () => {
    try {
      const response = await axios.post('http://localhost:3000/comandas', {
        usuarioId: 1, // Exemplo: ID fixo
      });
      alert(`Comanda ID ${response.data.id} criada com sucesso!`);
      carregarComandas();
    } catch (error) {
      alert('Erro ao criar comanda');
    }
  };

  useEffect(() => {
    carregarComandas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Comandas</Text>
      <Button title="Criar Comanda" onPress={adicionarComanda} />
      <FlatList
        data={comandas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>Comanda #{item.id} - Usuário: {item.usuarioId}</Text>}
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
});