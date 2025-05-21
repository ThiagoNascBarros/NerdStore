import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../service/api';
import DeleteModal from '../components/DeleteModal';

export default function VisualizarItemScreen({ route, navigation }) {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/item/${item.id}`);
      Alert.alert('Sucesso', 'Item excluído com sucesso!');
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o item.');
    }
  };

  const handleEdit = () => {
    const adaptedItem = {
      id: item.id,
      name: item.name || item.nome,
      category: item.category || item.categoria,
      price: item.price || item.preco,
      rating: item.rating || item.classificacao,
      imageUrl: item.imageUrl || item.imagemUrl,
      description: item.description || item.descricao,
    };
    navigation.navigate('EditarItemScreen', { item: adaptedItem });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ionicons
                    key={i}
                    name={i <= item.rating ? 'star' : 'star-outline'}
                    size={22}
                    color="#7B4AE2"
                    style={{ marginRight: 16 }}
                  />
                ))}
              </View>
              <Text style={styles.category}>Categoria: {item.category}</Text>
              <Text style={styles.price}>R$ {item.price ? Number(item.price).toFixed(2) : '0.00'}</Text>
              <Text style={styles.description}>Descrição: {item.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="trash" size={29} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="pencil" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <DeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  nameContainer: {
    gap: 16,
    marginTop: 0,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 16,
    zIndex: 2,
    backgroundColor: '#5938A5',
    borderRadius: 50,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 400,
  },
  infoContainer: {
    width: '90%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    width: '90%',
    gap: 215,
    paddingVertical: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#000',
    marginBottom: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  category: {
    color: '#000',
    fontSize: 20,
    marginBottom: 1,
    fontWeight: 500,
  },
  price: {
    color: '#5938A5',
    fontWeight: 'bold',
    fontSize: 20.23,

  },
  categoryContainer: {
    marginTop: 0,
  },
  description: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'medium',
  },
  buttonRow: {
    flexDirection: 'colunm',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  deleteButton: {
    backgroundColor: '#5938A5',
    borderRadius: 16,
    width: 73,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#5938A5',
    borderRadius: 18,
    width: 73,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
