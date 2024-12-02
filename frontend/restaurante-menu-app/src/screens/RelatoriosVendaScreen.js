import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RelatorioVendasScreen() {
  const [vendas, setVendas] = useState([]);

  const carregarRelatorio = async () => {
    try {
      const response = await axios.get('http://localhost:3000/relatorios/vendas');
      setVendas(response.data);
    } catch (error) {
      alert('Erro ao carregar relatório');
    }
  };

  useEffect(() => {
    carregarRelatorio();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Vendas</Text>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            Data: {item.data} - Total: R$ {item.total.toFixed(2)}
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