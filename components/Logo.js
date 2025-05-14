import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <Image source={require('../img/Logo.png')} style={styles.logo} resizeMode="contain" />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 100,
    marginTop: 30,
    margin: "auto"
  },
}); 