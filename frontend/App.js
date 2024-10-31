import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const cadastrarUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios', {
        nome,
        email,
        senha,
      });
      setMensagem(`Usuário ${response.data.nome} cadastrado com sucesso!`);
    } catch (error) {
      setMensagem('Erro ao cadastrar usuário');
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Cadastrar" onPress={cadastrarUsuario} />
      {mensagem && <Text>{mensagem}</Text>}
    </View>
  );
}
