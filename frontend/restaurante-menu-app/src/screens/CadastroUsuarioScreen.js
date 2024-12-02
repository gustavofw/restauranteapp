import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function CadastroUsuarioScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const cadastrarUsuario = async () => {
    try {
      const response = await api.post('/usuarios', { nome, email, senha });
      if (response.status === 201) {
        Alert.alert('Sucesso', `Usuário ${response.data.nome} cadastrado com sucesso!`);
        setNome('');
        setEmail('');
        setSenha('');
        setMensagem('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={cadastrarUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
