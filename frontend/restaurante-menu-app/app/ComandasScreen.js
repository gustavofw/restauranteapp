import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
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
      const comandasFiltradas = response.data.filter(
        (value, index, self) => self.findIndex((v) => v.comanda_id === value.comanda_id) === index
      );
      setComandas(comandasFiltradas || []); 
    } catch (error) {
      alert('Erro ao carregar comandas');
    }
  };

  const adicionarItemPedido = () => {
    if (!itemSelecionado || !quantidade || quantidade <= 0) {
      alert('Por favor, selecione um item e informe uma quantidade válida');
      return;
    }

    const itemExistente = itensSelecionados.find((item) => item.id === itemSelecionado);

    if (itemExistente) {
      setItensSelecionados((prevState) =>
        prevState.map((item) =>
          item.id === itemSelecionado
            ? { ...item, quantidade: item.quantidade + parseInt(quantidade) }
            : item
        )
      );
    } else {
      const itemNome = itens.find((item) => item.id === itemSelecionado)?.nome || '';
      setItensSelecionados((prevState) => [
        ...prevState,
        { id: itemSelecionado, nome: itemNome, quantidade: parseInt(quantidade) },
      ]);
    }

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

  const carregarComandasPorUsuario = async (usuarioId) => {
    try {
      if (!usuarioId) {
        setComandas([]); 
        return;
      }
  
      const response = await axios.get(`http://localhost:3000/comandas?usuarioId=${usuarioId}`);
      setComandas(response.data || []); 
    } catch (error) {
      alert('Erro ao carregar comandas');
    }
  };
  
  useEffect(() => {
    carregarComandasPorUsuario(usuarioSelecionado);
  }, [usuarioSelecionado]);
  
  const fecharComanda = async () => {
    if (!comandaSelecionada) {
      alert('Por favor, selecione uma comanda!');
      return;
    }
  
    try {
      await axios.put(`http://localhost:3000/comandas/${comandaSelecionada}/fechar`);
      alert('Comanda fechada com sucesso!');
      setComandaSelecionada('');
      carregarComandasPorUsuario(usuarioSelecionado); 
    } catch (error) {
      alert('Erro ao fechar comanda');
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Comandas</Text>

      <Text>Selecione um Usuário:</Text>
      <Picker
        selectedValue={usuarioSelecionado}
        onValueChange={(itemValue) => setUsuarioSelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um usuário" value="" />
        {usuarios.map((usuario) => (
          <Picker.Item key={usuario.id} label={usuario.nome} value={usuario.id} />
        ))}
      </Picker>

      <Text>Selecione um Item:</Text>
      <Picker
        selectedValue={itemSelecionado}
        onValueChange={(itemValue) => setItemSelecionado(itemValue)}
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
      <Button title="Adicionar ao Pedido" onPress={adicionarItemPedido} />

      <Button title="Criar Comanda" onPress={adicionarComanda} />

        <Text>Selecione uma Comanda para Fechamento:</Text>
        <Picker
          selectedValue={comandaSelecionada}
          onValueChange={(itemValue) => setComandaSelecionada(itemValue)}
        >
          <Picker.Item label="Selecione uma comanda" value="" />
          {comandas.map((comanda) => (
            <Picker.Item
              key={comanda.comanda_id}
              label={`Comanda #${comanda.comanda_id}`}
              value={comanda.comanda_id}
            />
          ))}
        </Picker>
        <Button title="Fechar Comanda" onPress={() => fecharComanda(item.comanda_id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
  },
});