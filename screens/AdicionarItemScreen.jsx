import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { createItem } from '../services/api';

export default function AdicionarItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChooseImage = async () => {
    // Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos!');
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
        name,
        category,
        description,
        price: parseFloat(price),
        rating,
        imageUrl: image, // Aqui você precisará implementar o upload da imagem para um servidor
      };

      await createItem(itemData);
      Alert.alert('Sucesso', 'Item adicionado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o item. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B4AE2" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Adicionar Item</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="adicione o nome do item"
          placeholderTextColor="#BFA6E2"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="adicione a sua categoria"
          placeholderTextColor="#BFA6E2"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="adicione a descrição do item"
          placeholderTextColor="#BFA6E2"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Preço</Text>
        <TextInput
          style={styles.input}
          placeholder="Adicione preço do item"
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
    </KeyboardAvoidingView>
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
    padding: 15,
    fontSize: 15,
    marginBottom: 5,
    color: '#222',
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
});
