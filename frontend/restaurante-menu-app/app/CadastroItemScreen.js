import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CadastroItemScreen() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');
  const [itens, setItens] = useState([]);

  const cadastrarItem = async () => {
    try {
      const response = await axios.post('http://localhost:3000/itens/cadastrar', {
        nome,
        preco,
        tipo,
      });
      Alert.alert('Sucesso!', `Item ${response.data.nome} cadastrado com sucesso!`);
      setNome('');
      setPreco('');
      setTipo('');
      carregarItens();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar item');
    }
  };

  const carregarItens = async () => {
    try {
      const response = await axios.get('http://localhost:3000/itens');
      setItens(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar itens');
    }
  };

  useEffect(() => {
    carregarItens();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Itens</Text>

      <View style={styles.inputContainer}>
        <Icon name="cart-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Nome do Item"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="currency-usd" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Preço"
          value={preco}
          onChangeText={setPreco}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="tag-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Tipo"
          value={tipo}
          onChangeText={setTipo}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={cadastrarItem}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>R$ {item.preco}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum item encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f57c00',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});