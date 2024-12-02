import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotaoPersonalizado({ titulo, onPress, estilo }) {
  return (
    <TouchableOpacity style={[styles.botao, estilo]} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  texto: {
    color: '#fff',
    fontSize: 16,
  },
});
