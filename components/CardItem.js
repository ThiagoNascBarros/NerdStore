import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CardItem({ item }) {
  if (!item) return null;

  const navigation = useNavigation();
  const { name, category, price, rating, imageUrl } = item;
  console.log('imageUrl:', imageUrl);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('VisualizarItemScreen', { item })} activeOpacity={0.85}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons
                key={i}
                name={i <= rating ? 'star' : 'star-outline'}
                size={18}
                color="#7B4AE2"
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.category}>Categoria: {category}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>R$ {price ? Number(price).toFixed(2) : '0.00'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E9DDFB',
    borderRadius: 8,
    padding: 0,
    width: 180,
    height: 240,
    margin: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2D1B4E',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  category: {
    color: '#2D1B4E',
    fontSize: 13,
    marginBottom: 0,
  },
  price: {
    color: '#7B4AE2',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
  },
  footer: {
    width: '100%',
    alignItems: 'flex-start',
  },
});
