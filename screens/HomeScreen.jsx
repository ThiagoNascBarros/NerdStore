import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import CharactersImage from '../components/CharactersImage';
import MainButton from '../components/MainButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.description}>
        Descubra, colecione e{"\n"}personalize o seu mundo nerd
      </Text>
      <CharactersImage />
      <MainButton onPress={() => navigation.navigate('InicialScreen')} style={styles.button}>
        Entrar na sua coleção
      </MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  description: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#5938A5",
    marginVertical: 20,
  },
  button: {
    width: 354,
    alignItems: 'center',
  },
}); 