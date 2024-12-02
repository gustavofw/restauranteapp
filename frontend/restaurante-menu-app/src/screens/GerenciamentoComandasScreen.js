import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import api from '../services/api';
import BotaoPersonalizado from '../components/BotaoPersonalizado';

export default function GerenciamentoComandasScreen() {
  const [comandas, setComandas] = useState([]);

  useEffect(() => {
    carregarComandas();
  }, []);

  const carregarComandas = async () => {
    try {
      const response = await api.get('/comandas');
      setComandas(response.data);
    } catch (error) {
      console.error('Erro ao carregar comandas:', error);
    }
  };

  const fecharComanda = async (id) => {
    try {
      await api.put(`/comandas/${id}/fechar`);
      carregarComandas();
    } catch (error) {
      console.error('Erro ao fechar comanda:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Comandas</Text>
      <FlatList
        data={comandas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Mesa: {item.mesa}</Text>
            <Text>Status: {item.status}</Text>
            {item.status !== 'Fechada' && (
              <BotaoPersonalizado
                titulo="Fechar Comanda"
                onPress={() => fecharComanda(item.id)}
              />
            )}
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
