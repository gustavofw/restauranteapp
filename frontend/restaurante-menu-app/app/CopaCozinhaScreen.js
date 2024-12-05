import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CopaCozinhaScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [copas, setCopas] = useState([]);
  const [cozinhas, setCozinhas] = useState([]);

  const carregarPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pedidos');
      const pedidos = response.data;

      const itensResponse = await axios.get('http://localhost:3000/itens');
      const usuariosResponse = await axios.get('http://localhost:3000/usuarios');
      const itens = itensResponse.data;
      const usuarios = usuariosResponse.data;

      const pedidosComDetalhes = pedidos.map((pedido) => {
        const item = itens.find((i) => i.id === pedido.itemId);
        const usuario = usuarios.find((u) => u.id === pedido.usuarioId);
        return {
          ...pedido,
          itemNome: item?.nome || 'Item Desconhecido',
          usuarioNome: usuario?.nome || 'Usuário Desconhecido',
          categoria: item?.categoria || 'Desconhecida', 
        };
      });

      setPedidos(pedidosComDetalhes);

      setCopas(pedidosComDetalhes.filter((pedido) => pedido.categoria === 'bebida'));
      setCozinhas(pedidosComDetalhes.filter((pedido) => pedido.categoria === 'prato'));
    } catch (error) {
      alert('Erro ao carregar pedidos');
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const renderPedido = ({ item }) => (
    <View style={styles.pedidoContainer}>
      <Text style={styles.pedidoText}>
        <Text style={styles.boldText}>Comanda #{item.comandaId}:</Text> {item.itemNome} -{' '}
        {item.usuarioNome} - Status: {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Copa & Cozinha</Text>

      <Text style={styles.sectionTitle}>Copa (Bebidas)</Text>
      <FlatList
        data={copas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma bebida pendente</Text>}
      />

      <Text style={styles.sectionTitle}>Cozinha (Pratos)</Text>
      <FlatList
        data={cozinhas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum prato pendente</Text>}
      />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  pedidoContainer: {
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
  pedidoText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
  },
});