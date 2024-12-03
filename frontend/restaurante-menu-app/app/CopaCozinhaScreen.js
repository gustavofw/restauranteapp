import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CopaCozinhaScreen() {
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pedidos');
      setPedidos(response.data);
    } catch (error) {
      alert('Erro ao carregar pedidos');
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Copa & Cozinha</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            Pedido #{item.id} - Item: {item.itemId} - Status: {item.status}
          </Text>
        )}
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