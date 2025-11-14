import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');


const atalhos = [
  { name: 'Linhas', icon: 'bus-marker', screen: 'Linhas' },
  { name: 'Perfil', icon: 'account-outline', screen: 'Perfil' },
  { name: 'Sobre nós', icon: 'information-outline', screen: 'Sobre' },
];

const ShortcutCard = ({ name, icon, screen, navigation }) => (
  <TouchableOpacity
    style={styles.shortcutCard}
    onPress={() => handleShortcutPress(screen, navigation)}
  >
    <MaterialCommunityIcons name={icon} size={30} color="#FF8C00" />
    <Text style={styles.shortcutText}>{name}</Text>
  </TouchableOpacity>
);


const handleShortcutPress = (screenName, navigation) => {
  if (screenName === 'Perfil') {
    navigation.navigate('Perfil', {
      nome: 'Vicenzo',
      email: 'vicenzo@email.com',
    });
  } else {
    navigation.navigate(screenName);
  }
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.welcomeText}>👋 Olá, Usuário!</Text>
        <Text style={styles.headerTitle}>Onde você quer ir hoje?</Text>

        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar linha, rua ou parada..."
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.contentPadding}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acessos Rápidos</Text>
          <View style={styles.shortcutsRow}>
            {atalhos.map(item => (
              <ShortcutCard
                key={item.name}
                name={item.name}
                icon={item.icon}
                screen={item.screen}
                navigation={navigation}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Paradas</Text>
          <View style={styles.infoCard}>
            <Ionicons name="location-outline" size={24} color="#333" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Parada mais próxima: Rua das Palmeiras</Text>
              <Text style={styles.infoSubtitle}>Linha 1021 - Cidade Universitária: Chega em 5 min</Text>
              <Text style={styles.infoSubtitle}>Linha 403 - Santo Antônio: Chega em 12 min</Text>
            </View>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Ver Mais</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mapa Rápido</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeText: { fontSize: 16, color: '#666', marginBottom: 5 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  contentScroll: { flex: 1 },
  contentPadding: { padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  shortcutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  shortcutCard: {
    width: (width - 60) / 3,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
  },
  shortcutText: { fontSize: 12, marginTop: 5, color: '#333', fontWeight: '500' },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2ecc71',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContent: { flex: 1, marginLeft: 10 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  infoSubtitle: { fontSize: 14, color: '#666' },
  detailsButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailsButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#BFE0FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mapText: { color: '#333', fontStyle: 'italic', textAlign: 'center', padding: 20 },
});