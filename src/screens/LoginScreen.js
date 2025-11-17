import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    try {
      const response = await fetch(`https://projeto-sa-buscreen.onrender.com/api/users/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`, {
        method: "GET"
      });

      const texto = await response.text();
      let data;
      try {
        data = JSON.parse(texto);
      } catch {
        data = { mensagem: texto };
      }

      if (response.status === 200) {
        Alert.alert("Sucesso", data.mensagem || "Login realizado com sucesso!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", data.mensagem || `Erro no login (status ${response.status}).`);
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscreen</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF8C00', justifyContent: 'center', padding: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 30, textAlign: 'center' },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: { backgroundColor: '#fff', paddingVertical: 15, borderRadius: 10, marginBottom: 15 },
  buttonText: { color: '#FF8C00', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  link: { color: '#fff', textAlign: 'center', fontSize: 14 },
});
