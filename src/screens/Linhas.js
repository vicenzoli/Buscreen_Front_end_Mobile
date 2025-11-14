import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const LinhaItem = ({ id, nome, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.linhaCard, isSelected && styles.linhaCardSelected]}
    onPress={onPress}
  >
    <MaterialCommunityIcons name="bus" size={24} color="#FF8C00" style={styles.linhaIcon} />
    <View>
      <Text style={styles.linhaNome}>{nome}</Text>
      <Text style={styles.linhaID}>{id}</Text>
    </View>
  </TouchableOpacity>
);

export default function LinhasScreen({ navigation }) {
  const [linhas, setLinhas] = useState([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  const [searchID, setSearchID] = useState("");

  
  useEffect(() => {
    fetch("https://projeto-sa-buscreen.onrender.com/api/linhas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setLinhas(data.linhas); 
      })
      .catch((error) => {
        console.log(" Erro ao buscar linhas:", error);
      });
  }, []);

  const buscarLinhaPorID = (id) => {
    if (!id) return;
  
    fetch(`https://projeto-sa-buscreen.onrender.com/api/linhas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Linha não encontrada");
        }
        return response.json();
      })
      .then((data) => {
        setLinhaSelecionada(data); 
      })
      .catch((error) => {
        console.log(" Erro ao buscar linha por ID:", error.message);
        setLinhaSelecionada(null); 
      });
  };
  
  

  return (
    <View style={styles.container}>
      {}
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
          <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
            <Text style={styles.menuItem}>Sobre nós</Text>
          </TouchableOpacity>
        </View>
      </View>

      {}
      <Text style={styles.title}>Linhas de Ônibus</Text>

      {}
      <View style={styles.searchBar}>
        <AntDesign name="search" size={20} color="#666" />
        <TextInput
          placeholder="Pesquise por ID da linha"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchID}
          onChangeText={setSearchID}
          onSubmitEditing={() => buscarLinhaPorID(searchID)}
          keyboardType="numeric"
/>
      </View>

      {}
      <ScrollView style={styles.linhasList}>
      {linhas.map((linha) => (
   <LinhaItem
    key={linha.id.toString()} 
    id={linha.id}
    nome={linha.nome_linha}
    isSelected={linhaSelecionada?.id === linha.id}
    onPress={() => setLinhaSelecionada(linha)}
  />
))}

      </ScrollView>

      {}
      {linhaSelecionada && (
        <View style={styles.trajetoContainer}>
          <Text style={styles.trajetoTitle}>Detalhes da Linha:</Text>
          <Text style={styles.trajetoNome}>{linhaSelecionada.nome_linha}</Text>
          <View style={styles.trajetoBox}>
            <Text style={styles.trajetoInfo}>🚌 Companhia: {linhaSelecionada.companhia}</Text>
            <Text style={styles.trajetoInfo}>👥 Lotação máxima: {linhaSelecionada.lotacao_maxima}</Text>
            <Text style={styles.trajetoInfo}>⏰ Horário: {linhaSelecionada.horario}</Text>
          </View>
        </View>
      )}

      {}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Buscreen. Todos os direitos reservados.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF8C00', paddingHorizontal: 20, paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  logoContainer: { flexDirection: 'row' },
  logoTextBold: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  logoTextLight: { fontSize: 24, fontWeight: '300', color: '#fff' },
  menuContainer: { flexDirection: 'row', alignItems: 'center' },
  menuItem: { marginLeft: 15, fontSize: 14, color: '#fff' },
  activeMenuItem: { fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff' },

  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffd5a3',
  },
  linhaCardSelected: { borderColor: '#FF8C00', backgroundColor: '#fffbe6' },
  linhaIcon: { marginRight: 15 },
  linhaNome: { fontSize: 16, fontWeight: 'bold', color: '#FF8C00' },
  linhaID: { fontSize: 14, color: '#333' },

  trajetoContainer: { marginTop: 20, padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  trajetoTitle: { fontSize: 20, fontWeight: 'bold', color: '#FF8C00', marginBottom: 10 },
  trajetoNome: { fontSize: 18, color: '#333', marginBottom: 10 },
  trajetoBox: { backgroundColor: '#BFE0FF', padding: 15, borderRadius: 8 },
  trajetoInfo: { fontSize: 14, color: '#333' },

  footer: { alignItems: 'center', paddingVertical: 10 },
  footerText: { fontSize: 12, color: '#fff' },
});