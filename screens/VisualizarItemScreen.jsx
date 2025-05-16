import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../service/api';

export default function VisualizarItemScreen({ route, navigation }) {
  const { item } = route.params;

  const handleDelete = async () => {
    Alert.alert(
      'Excluir Item',
      'Tem certeza que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/item/${item.id}`);
              Alert.alert('Sucesso', 'Item excluído com sucesso!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o item.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('AdicionarItemScreen', { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#7B4AE2" />
        </TouchableOpacity>
        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons
                key={i}
                name={i <= item.rating ? 'star' : 'star-outline'}
                size={22}
                color="#7B4AE2"
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.category}>Categoria: {item.category}</Text>
          <Text style={styles.price}>R$ {item.price ? Number(item.price).toFixed(2) : '0.00'}</Text>
          <Text style={styles.descriptionTitle}>Descrição:</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9DDFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 320,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    margin: 10,
  },
  backButton: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 16,
    alignItems: 'flex-start',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#2D1B4E',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  category: {
    color: '#2D1B4E',
    fontSize: 15,
    marginBottom: 4,
  },
  price: {
    color: '#7B4AE2',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    color: '#2D1B4E',
    marginTop: 6,
    marginBottom: 2,
  },
  description: {
    color: '#222',
    fontSize: 14,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 18,
    alignSelf: 'center',
    gap: 30,
  },
  deleteButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
});
