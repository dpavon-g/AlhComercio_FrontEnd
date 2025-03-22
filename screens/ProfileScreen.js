import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/ProfileStyle.js';

export default function ProfileScreen({ navigation }) {
  const navigateToScreen = (screen) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  const handleLogout = () => {
    // Aquí iría tu lógica de cerrar sesión (por ejemplo, limpiar almacenamiento, tokens, etc.)
    navigateToScreen('LoginScreen'); // Navega a la pantalla de login después de cerrar sesión
  };

  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}