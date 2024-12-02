import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function ComandasScreen() {
  const [comandas, setComandas] = useState([]);

  useEffect(() => {
    carregarComandas();
  }, []);

  const carregarComandas = async () => {
    try {
      const response = await api.get('/comandas');
      setComandas(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as comandas.');
    }
  };

  const finalizarComanda = async (id) => {
    try {
      await api.put(`/comandas/${id}/finalizar`);
      Alert.alert('Sucesso', 'Comanda finalizada!');
      carregarComandas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível finalizar a comanda.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.comanda}>
      <Text style={styles.text}>ID: {item.id}</Text>
      <Text style={styles.text}>Cliente: {item.Usuario?.nome || 'Desconhecido'}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Button title="Finalizar" onPress={() => finalizarComanda(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comandas}
        keyExtractor={(item) => item.id.toString()}
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
  comanda: {
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
