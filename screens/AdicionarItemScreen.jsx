import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import api from '../service/api';

// Definindo as categorias disponíveis
const CATEGORIAS = ['ACF', "HQ's", 'Games', 'Outros'];

export default function AdicionarItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      maxWidth: 800,
      maxHeight: 800,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !category || !description || !price || !image) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }

    try {
      setLoading(true);

      const itemData = {
        nome: name,
        categoria: category,
        descricao: description,
        preco: parseFloat(price),
        classificacao: rating,
        imagemUrl: image
      };

      const response = await api.post('/item', itemData);

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Item adicionado com sucesso!');
        setName('');
        setCategory('');
        setDescription('');
        setPrice('');
        setRating(0);
        setImage(null);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o item. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione uma categoria</Text>
            <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
              <Ionicons name="close" size={24} color="#7B4AE2" />
            </TouchableOpacity>
          </View>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryOption,
                category === cat && styles.categoryOptionSelected
              ]}
              onPress={() => {
                setCategory(cat);
                setShowCategoryModal(false);
              }}
            >
              <Text style={[
                styles.categoryOptionText,
                category === cat && styles.categoryOptionTextSelected
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B4AE2" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Adicionar Item</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Camiseta Batman"
        placeholderTextColor="#BFA6E2"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Categoria</Text>
      <TouchableOpacity
        style={styles.categorySelector}
        onPress={() => setShowCategoryModal(true)}
      >
        <Text style={[styles.categorySelectorText, !category && styles.categorySelectorPlaceholder]}>
          {category || 'Selecione uma categoria'}
        </Text>
        <Ionicons name="chevron-down" size={24} color="#7B4AE2" />
      </TouchableOpacity>

      {renderCategoryModal()}

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Produto novo, pouco uso"
        placeholderTextColor="#BFA6E2"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 49,90"
        placeholderTextColor="#BFA6E2"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Escolha sua imagem</Text>
      <TouchableOpacity style={styles.imageButton} onPress={handleChooseImage}>
        <Text style={styles.imageButtonText}>Clique e escolha sua imagem</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

      <Text style={styles.label}>Classificação</Text>
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons
              name={i <= rating ? 'star' : 'star-outline'}
              size={32}
              color="#7B4AE2"
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation?.goBack?.()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 19,
    top: 65,
    zIndex: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7B4AE2',
    textAlign: 'center',
    marginVertical: 50,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 19,
    marginTop: 5,
    marginBottom: 18,
    color: '#222',
  },
  input: {
    backgroundColor: '#E9DDFB',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 5,
    color: '#222',
    textAlignVertical: 'center',
  },
  imageButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  previewImage: {
    width: 180,
    height: 130,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 9,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 38,
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 16,
  },
  cancelButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySelector: {
    backgroundColor: '#E9DDFB',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categorySelectorText: {
    fontSize: 15,
    color: '#222',
  },
  categorySelectorPlaceholder: {
    color: '#BFA6E2',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9DDFB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B4AE2',
  },
  categoryOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryOptionSelected: {
    backgroundColor: '#7B4AE2',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#222',
  },
  categoryOptionTextSelected: {
    color: '#fff',
  },
});
