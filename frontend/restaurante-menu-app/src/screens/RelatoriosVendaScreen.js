import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';

export default function RelatorioVendasScreen() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    carregarRelatorio();
  }, []);

  const carregarRelatorio = async () => {
    try {
      const response = await api.get('/relatorios/vendas');
      setRelatorio(response.data);
    } catch (error) {
      console.error('Erro ao carregar relatório:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Relatório de Vendas</Text>
      <FlatList
        data={relatorio}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Item: {item.item.nome}</Text>
            <Text>Quantidade Vendida: {item.quantidade}</Text>
            <Text>Total: R$ {item.total}</Text>
          </View>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
