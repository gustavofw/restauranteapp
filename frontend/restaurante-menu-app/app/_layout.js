import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="sobre" options={{ title: 'Sobre' }} />
      <Stack.Screen name="CadastroUsuarioScreen" options={{ title: 'Cadastro de Usuários' }} />
      <Stack.Screen name="CadastroItemScreen" options={{ title: 'Cadastro de Itens' }} />
      <Stack.Screen name="ComandasScreen" options={{ title: 'Comandas' }} />
      <Stack.Screen name="LoginScreen" options={{ title: 'Login' }} />
      <Stack.Screen name="RelatoriosVendaScreen" options={{ title: 'Relatório de Vendas' }} />
    </Stack>
  );
}