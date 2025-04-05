import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de importar AsyncStorage
import styles from '../styles/ProfileStyle.js';

export default function ProfileScreen({ navigation }) {
  const navigateToScreen = (screen) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      
      navigateToScreen('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  const handleLogout2 = () => {
    try {
      navigateToScreen('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout2}>
        <Text style={styles.buttonText}>Cerrar sesión2</Text>
      </TouchableOpacity>
    </View>
  );
}
