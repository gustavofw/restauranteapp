import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function RelatoriosScreen() {
  const [relatorios, setRelatorios] = useState([]);

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const carregarRelatorios = async () => {
    try {
      const response = await api.get('/relatorios/vendas');
      setRelatorios(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os relatórios.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.relatorio}>
      <Text style={styles.text}>Data: {item.data}</Text>
      <Text style={styles.text}>Total Vendas: R$ {item.totalVendas}</Text>
      <Text style={styles.text}>Itens Vendidos: {item.itensVendidos}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={relatorios}
        keyExtractor={(item) => item.data}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  relatorio: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  text: {
    marginBottom: 5,
  },
});
