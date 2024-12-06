import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RelatorioVendasScreen() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    carregarRelatorio();
  }, []);

  const carregarRelatorio = async () => {
    try {
      const response = await axios.get('http://localhost:3000/relatorios/vendas');
      setRelatorio(response.data || []);
    } catch (error) {
      alert('Erro ao carregar relatório de vendas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Vendas</Text>

      {relatorio.length === 0 ? (
        <Text style={styles.emptyMessage}>Não há vendas registradas.</Text>
      ) : (
        <FlatList
          data={relatorio}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.comandaContainer}>
              <Text>Usuário: {item.usuario}</Text>
              <Text>Itens Pedidos:</Text>
              {item.itens.map((itemPedido, index) => (
                <Text key={index}>
                  {itemPedido.item} (x{itemPedido.quantidade}) - R${itemPedido.valor.toFixed(2)}
                </Text>
              ))}
              <Text style={styles.valorTotal}>Valor Total: R${item.valorTotal.toFixed(2)}</Text>
              <Text>Data: {new Date(item.data).toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  comandaContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  valorTotal: {
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
  },
});