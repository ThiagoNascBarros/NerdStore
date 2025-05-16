import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Logo from '../components/Logo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import api from '../service/api';
import CardItem from '../components/CardItem';
import { useFocusEffect } from '@react-navigation/native';

// Definindo as categorias disponíveis
const CATEGORIAS = ['ACF', "HQ's", 'Games', 'Outros'];

export default function InicialScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const loadItems = async () => {
    try {
      const response = await api.get("/item");
      const adaptedItems = adaptItems(response.data);
      setItems(adaptedItems);
      setFilteredItems(adaptedItems);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  // Carrega os itens quando a tela recebe foco
  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  // Efeito para filtrar os itens quando o filtro ou a busca mudar
  useEffect(() => {
    let result = [...items];

    // Aplica o filtro de categoria
    if (selectedFilter !== null) {
      result = result.filter(item => item.category === CATEGORIAS[selectedFilter]);
    }

    // Aplica o filtro de busca
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredItems(result);
  }, [selectedFilter, search, items]);

  const adaptItems = (apiItems) =>
    apiItems.map(item => ({
      id: item.id,
      name: item.nome,
      category: item.categoria, 
      price: item.preco,
      rating: item.classificacao,
      imageUrl: item.imagemUrl,
      description: item.descricao,
    }));

  const pickImage = async () => {
    // Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar suas fotos!');
      return;
    }

    // Abre o seletor de imagens
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // Aqui você pode fazer o que quiser com a URI da imagem
      console.log('URI da imagem selecionada:', result.assets[0].uri);
    }
  };

  // Header para o FlatList
  const renderHeader = () => (
    <>
      <Logo />
      <View style={[styles.searchContainer, { width: '90%', alignSelf: 'center' }]}>
        <Feather
          name="search"
          size={17}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise seu item"
          placeholderTextColor="black"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={[styles.filtersRow, { width: '97.9%', alignSelf: 'center' }]}>
        {CATEGORIAS.map((filter, idx) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === idx && styles.filterButtonSelected]}
            onPress={() => setSelectedFilter(selectedFilter === idx ? null : idx)}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.headerRow, { width: '90%', alignSelf: 'center' }]}>
        <Text style={styles.title}>Seus itens</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AdicionarItemScreen')}>
          <Ionicons name="add-circle-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => <CardItem item={item} />}
        columnWrapperStyle={{ justifyContent: 'center' }}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#E9DDFB',
    borderRadius: 15,
    paddingTop: 16,
    paddingLeft: 45,
    paddingBottom: 16,
    paddingRight: 26,
    fontSize: 16,
    color: '#000',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 20,
    width: 75,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginBottom: 6,
  },
  filterButtonSelected: {
    backgroundColor: '#5938A5',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'semibold',
    fontSize: 12,
  },
  addButtonImage: {
    width: 28,
    height: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 28,
    width: 75,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '95%',
    marginTop: 10,
  },
  imagePickerButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
});
