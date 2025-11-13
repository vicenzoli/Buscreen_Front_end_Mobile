import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ route, navigation }) {
  const { nome, email } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{nome || 'Não informado'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email || 'Não informado'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FF8C00', marginBottom: 30, textAlign: 'center' },
  infoBox: { marginBottom: 30 },
  label: { fontSize: 16, color: '#666', marginBottom: 5 },
  value: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});