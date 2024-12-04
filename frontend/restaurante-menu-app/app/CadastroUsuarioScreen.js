import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CadastroUsuarioScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const cadastrarUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios/cadastrar', {
        nome,
        email,
        senha,
      });
      alert(`Usuário ${response.data.nome} cadastrado com sucesso!`);
      carregarUsuarios();
    } catch (error) {
      alert('Erro ao cadastrar usuário');
    }
  };

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios',{headers:{'Content-Type': 'application/json'}});
      console.log(response)
      setUsuarios(response.data);
    } catch (error) {
      alert('Erro ao carregar usuários');
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuários</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} style={styles.input} />
      <Button title="Cadastrar" onPress={cadastrarUsuario} />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.nome} - {item.email}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});