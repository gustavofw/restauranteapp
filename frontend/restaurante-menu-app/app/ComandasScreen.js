import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function ComandasScreen() {
  const [comandas, setComandas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [itens, setItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [comandaSelecionada, setComandaSelecionada] = useState('');

  useEffect(() => {
    carregarUsuarios();
    carregarItens();
    carregarComandas();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data || []);
    } catch (error) {
      alert('Erro ao carregar usuários');
    }
  };

  const carregarItens = async () => {
    try {
      const response = await axios.get('http://localhost:3000/itens');
      setItens(response.data || []);
    } catch (error) {
      alert('Erro ao carregar itens');
    }
  };

  const carregarComandas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/comandas');
      setComandas(response.data || []);
    } catch (error) {
      alert('Erro ao carregar comandas');
    }
  };

  const adicionarItemPedido = () => {
    if (!itemSelecionado || !quantidade || quantidade <= 0) {
      alert('Por favor, selecione um item e informe uma quantidade válida');
      return;
    }

    const itemNome = itens.find((item) => item.id === itemSelecionado)?.nome || '';
    setItensSelecionados((prevState) => [
      ...prevState,
      { id: itemSelecionado, nome: itemNome, quantidade: parseInt(quantidade) },
    ]);

    setItemSelecionado('');
    setQuantidade('');
  };

  const adicionarComanda = async () => {
    if (!usuarioSelecionado) {
      alert('Por favor, selecione um usuário!');
      return;
    }

    if (itensSelecionados.length === 0) {
      alert('Por favor, adicione ao menos um item à comanda!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/comandas', {
        usuarioId: usuarioSelecionado,
        pedidos: itensSelecionados.map((item) => ({
          itemId: item.id,
          quantidade: item.quantidade,
        })),
      });
      alert('Comanda criada com sucesso!');
      setItensSelecionados([]);
      carregarComandas();
    } catch (error) {
      alert('Erro ao criar comanda');
    }
  };

  const fecharComanda = async () => {
    if (!comandaSelecionada || isNaN(comandaSelecionada)) {
      alert('Por favor, selecione ou insira um número de comanda válido!');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/comandas/${comandaSelecionada}/fechar`);
      alert('Comanda fechada com sucesso!');
      setComandaSelecionada('');
      carregarComandas();
    } catch (error) {
      alert('Erro ao fechar comanda. Verifique o número inserido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Comandas</Text>

      <Text style={styles.label}>Selecione um Usuário:</Text>
      <Picker
        selectedValue={usuarioSelecionado}
        onValueChange={(itemValue) => setUsuarioSelecionado(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um usuário" value="" />
        {usuarios.map((usuario) => (
          <Picker.Item key={usuario.id} label={usuario.nome} value={usuario.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Selecione um Item:</Text>
      <Picker
        selectedValue={itemSelecionado}
        onValueChange={(itemValue) => setItemSelecionado(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um item" value="" />
        {itens.map((item) => (
          <Picker.Item key={item.id} label={item.nome} value={item.id} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarItemPedido}>
        <Text style={styles.buttonText}>Adicionar ao Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPrimary} onPress={adicionarComanda}>
        <Text style={styles.buttonText}>Criar Comanda</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Digite o ID da Comanda para Fechamento:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="ID da Comanda"
        value={comandaSelecionada}
        onChangeText={setComandaSelecionada}
      />
      <TouchableOpacity style={styles.button} onPress={fecharComanda}>
        <Text style={styles.buttonText}>Fechar Comanda</Text>
      </TouchableOpacity>

      
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
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff9800',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPrimary: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});