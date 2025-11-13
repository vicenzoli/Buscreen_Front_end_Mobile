import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho sem "Feedback" */}
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
          <Text style={[styles.menuItem, styles.activeMenuItem]}>Sobre nós</Text>
        </View>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Colaboradores</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>👨‍💻 Vítor Costa — Desenvolvedor Mobile App e Fundador</Text>
          <Text style={styles.cardText}>🧑‍💻 Vicenzo P — Desenvolvedor Web e Mobile e Fundador</Text>
          <Text style={styles.cardText}>👨‍💻 Vítor Costa — Desenvolvedor Web e Fundador</Text>
        </View>

        <Text style={styles.sectionTitle}>Nossa missão</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Facilitar a vida de quem depende do transporte público, tornando a locomoção mais previsível e eficiente.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Nossa visão</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Ser referência em mobilidade urbana inteligente, promovendo inovação e tecnologia acessível para todos.
          </Text>
        </View>
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Buscreen. Todos os direitos reservados.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF8C00' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  logoContainer: { flexDirection: 'row' },
  logoTextBold: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  logoTextLight: { fontSize: 24, fontWeight: '300', color: '#fff' },
  menuContainer: { flexDirection: 'row', alignItems: 'center' },
  menuItem: { marginLeft: 15, fontSize: 14, color: '#fff' },
  activeMenuItem: { fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff' },

  content: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20 },
  cardText: { fontSize: 16, color: '#333', marginBottom: 10 },

  footer: { alignItems: 'center', paddingVertical: 10 },
  footerText: { fontSize: 12, color: '#fff' },
});