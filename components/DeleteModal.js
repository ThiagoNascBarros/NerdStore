import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function DeleteModal({ visible, onCancel, onConfirm }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
        <Image source={require('../assets/icon-trash.png')} style={styles.icon} />
          <Text style={styles.title}>Tem certeza que deseja{'\n'}excluir esse item?</Text>

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#7B4AE2',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#7B4AE2',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
});
