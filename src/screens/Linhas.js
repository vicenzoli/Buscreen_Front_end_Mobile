import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const linhas = [
  { id: '1025', nome: 'Linha Noturna' },
  { id: '1011', nome: 'São José/Florianópolis' },
  { id: '1021', nome: 'Cidade Universitária' },
  { id: '1022', nome: 'Formiga/Shop Continente' },
];

const LinhaItem = ({ id, nome, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.linhaCard, isSelected && styles.linhaCardSelected]}
    onPress={onPress}
  >
    <MaterialCommunityIcons name="bus" size={24} color="#000" style={styles.linhaIcon} />
    <View>
      <Text style={styles.linhaNome}>{nome}</Text>
      <Text style={styles.linhaID}>{id}</Text>
    </View>
  </TouchableOpacity>
);

export default function LinhasScreen({ navigation }) {
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);

  return (
    <View style={styles.container}>
      {/* Cabeçalho com navegação */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoTextBold}>bu</Text>
          <Text style={styles.logoTextLight}>screen</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <Text style={[styles.menuItem, styles.activeMenuItem]}>Linhas</Text>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Sobre nós</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Título */}
      <Text style={styles.title}>Linhas de Ônibus</Text>

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#666" />
        <TextInput
          placeholder="Pesquise por uma linha"
          placeholderTextColor="#666"
          style={styles.searchInput}
        />
      </View>

      {/* Lista de linhas */}
      <ScrollView style={styles.linhasList}>
        {linhas.map((linha) => (
          <LinhaItem
            key={linha.id}
            id={linha.id}
            nome={linha.nome}
            isSelected={linhaSelecionada?.id === linha.id}
            onPress={() => setLinhaSelecionada(linha)}
          />
        ))}
      </ScrollView>

      {/* Trajeto da linha selecionada */}
      {linhaSelecionada && (
        <View style={styles.trajetoContainer}>
          <Text style={styles.trajetoTitle}>Trajeto:</Text>
          <Text style={styles.trajetoNome}>{linhaSelecionada.nome}</Text>
          <View style={styles.trajetoBox}>
            <Text style={styles.trajetoInfo}>🗺️ Mapa ou descrição do trajeto aqui</Text>
          </View>
        </View>
      )}

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Buscreen. Todos os direitos reservados.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoContainer: { flexDirection: 'row' },
  logoTextBold: { fontSize: 24, fontWeight: 'bold', color: '#FF8C00' },
  logoTextLight: { fontSize: 24, fontWeight: '300', color: '#000' },
  menuContainer: { flexDirection: 'row', alignItems: 'center' },
  menuItem: { marginLeft: 15, fontSize: 14, color: '#333' },
  activeMenuItem: { fontWeight: 'bold', color: '#FF8C00' },

  title: { fontSize: 24, fontWeight: 'bold', color: '#FF8C00', marginBottom: 15 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  linhasList: { flex: 1 },
  linhaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  linhaCardSelected: {
    borderColor: '#FF8C00',
    backgroundColor: '#fffbe6',
  },
  linhaIcon: { marginRight: 15 },
  linhaNome: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  linhaID: { fontSize: 14, color: '#666' },

  trajetoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#DDEEFF',
    borderRadius: 10,
  },
  trajetoTitle: { fontSize: 20, fontWeight: 'bold', color: '#FF8C00', marginBottom: 10 },
  trajetoNome: { fontSize: 18, color: '#333', marginBottom: 10 },
  trajetoBox: {
    backgroundColor: '#BFE0FF',
    padding: 15,
    borderRadius: 8,
  },
  trajetoInfo: { fontSize: 14, color: '#333' },

  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: { fontSize: 12, color: '#999' },
});