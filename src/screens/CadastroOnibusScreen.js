import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function CadastroOnibusScreen({ navigation }) {
  const [companhia, setCompanhia] = useState('');
  const [linha, setLinha] = useState('');
  const [lotacao, setLotacao] = useState('');
  const [horario, setHorario] = useState('');

  const handleCadastro = async () => {
    if (!companhia || !linha || !lotacao || !horario) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://projeto-sa-buscreen.onrender.com/api/onibus/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companhia,
          linha,
          lotacao,
          horario
        })
      });

      const texto = await response.text();
      let data;
      try {
        data = JSON.parse(texto);
      } catch {
        data = { mensagem: texto };
      }

      if (response.status === 201) {
        Alert.alert('Sucesso', data.mensagem || 'Ônibus cadastrado com sucesso!');
        setCompanhia('');
        setLinha('');
        setLotacao('');
        setHorario('');
      } else {
        Alert.alert('Erro', data.mensagem || `Erro ao cadastrar (status ${response.status}).`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar ônibus:', error);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logo e menu */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoTextBold}>bu</Text>
          <Text style={styles.logoTextLight}>screen</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Linhas')}>
            <Text style={styles.menuItem}>Linhas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
            <Text style={styles.menuItem}>Sobre nós</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulário de cadastro */}
      <Text style={styles.title}>Cadastro de Ônibus</Text>

      <TextInput
        style={styles.input}
        placeholder="Companhia"
        placeholderTextColor="#999"
        value={companhia}
        onChangeText={setCompanhia}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome da Linha"
        placeholderTextColor="#999"
        value={linha}
        onChangeText={setLinha}
      />
      <TextInput
        style={styles.input}
        placeholder="Lotação Máxima"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={lotacao}
        onChangeText={setLotacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário (ex: 06:00 - 22:00)"
        placeholderTextColor="#999"
        value={horario}
        onChangeText={setHorario}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Ônibus</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF8C00', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logoContainer: { flexDirection: 'row' },
  logoTextBold: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  logoTextLight: { fontSize: 28, fontWeight: '300', color: '#fff' },
  menuContainer: { flexDirection: 'row', gap: 15 },
  menuItem: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333'
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#FF8C00',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
