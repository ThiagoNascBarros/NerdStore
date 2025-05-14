import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function CharactersImage() {
  return (
    <Image source={require('../img/Herois.png')} style={styles.characters} resizeMode="contain" />
  );
}

const styles = StyleSheet.create({
  characters: {
    width: '100%',
    height: 450,
  },
}); 