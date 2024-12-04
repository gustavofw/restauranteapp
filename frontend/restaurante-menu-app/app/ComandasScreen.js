import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function ComandasScreen() {
  const [comandas, setComandas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [itens, setItens] = useState([]);
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    carregarUsuarios();
    carregarItens();
    carregarComandas();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      alert('Erro ao carregar usuários');
    }
  };

  const carregarItens = async () => {
    try {
      const response = await axios.get('http://localhost:3000/itens');
      setItens(response.data);
    } catch (error) {
      alert('Erro ao carregar itens');
    }
  };

  const carregarComandas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/comandas');
      setComandas(response.data);
    } catch (error) {
      alert('Erro ao carregar comandas');
    }
  };

  const adicionarItemPedido = (itemId) => {
    if (!quantidade || quantidade <= 0) {
      alert('Por favor, informe uma quantidade válida');
      return;
    }

    const itemExistente = itensSelecionados.find((item) => item.id === itemId);
    if (itemExistente) {
      setItensSelecionados((prevState) =>
        prevState.map((item) =>
          item.id === itemId ? { ...item, quantidade: parseInt(quantidade) } : item
        )
      );
    } else {
      setItensSelecionados((prevState) => [
        ...prevState,
        { id: itemId, quantidade: parseInt(quantidade) },
      ]);
    }
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
      const response = await axios.post('http://localhost:3000/comandas', {
        usuarioId: usuarioSelecionado.id,
        pedidos: itensSelecionados.map((item) => ({
          itemId: item.id,
          quantidade: item.quantidade,
        })),
      });
      alert(`Comanda ID ${response.data.comandaId} criada com sucesso!`);
      setItensSelecionados([]);
      carregarComandas();
    } catch (error) {
      alert('Erro ao criar comanda');
    }
  };

  const fecharComanda = async (id) => {
    try {
      await axios.put(`http://localhost:3000/comandas/${id}/fechar`);
      alert('Comanda fechada com sucesso!');
      carregarComandas();
    } catch (error) {
      alert('Erro ao fechar comanda');
    }
  };

  const adicionarPedidosComanda = async (id) => {
    if (itensSelecionados.length === 0) {
      alert('Por favor, adicione ao menos um item!');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/comandas/${id}/pedidos`, {
        pedidos: itensSelecionados.map((item) => ({
          itemId: item.id,
          quantidade: item.quantidade,
        })),
      });
      alert('Pedidos adicionados com sucesso!');
      setItensSelecionados([]);
      carregarComandas();
    } catch (error) {
      alert('Erro ao adicionar pedidos à comanda');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Comandas</Text>

      <Text>Selecione um Usuário:</Text>
      <Picker
        selectedValue={usuarioSelecionado ? usuarioSelecionado.id : null}
        onValueChange={(itemValue) => {
          const usuarioEscolhido = usuarios.find((usuario) => usuario.id === itemValue);
          setUsuarioSelecionado(usuarioEscolhido);
        }}
      >
        <Picker.Item label="Selecione um usuário" value={null} />
        {usuarios.map((usuario) => (
          <Picker.Item key={usuario.id} label={usuario.nome} value={usuario.id} />
        ))}
      </Picker>

      <Text>Selecione Itens:</Text>
      {itens.map((item) => (
        <View style={styles.itemContainer} key={item.id}>
          <Text>{item.nome}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <Button title="Adicionar ao Pedido" onPress={() => adicionarItemPedido(item.id)} />
        </View>
      ))}

      <Button title="Criar Comanda" onPress={adicionarComanda} />

      <FlatList
        data={comandas}
        keyExtractor={(item) => item.comanda_id ? item.comanda_id.toString() : '0'} // Verificando se comanda_id existe
        renderItem={({ item }) => (
          <View style={styles.comandaContainer}>
            <Text style={styles.comandaTitle}>Comanda #{item.comanda_id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Pedidos:</Text>
            {item.pedidos?.map((pedido) => (
              <Text key={pedido.pedido_id}>
                Item {pedido.item_id} - Quantidade: {pedido.quantidade}
              </Text>
            ))}
            <Button title="Fechar Comanda" onPress={() => fecharComanda(item.comanda_id)} />
            <Button title="Adicionar Pedidos" onPress={() => adicionarPedidosComanda(item.comanda_id)} />
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
  itemContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});