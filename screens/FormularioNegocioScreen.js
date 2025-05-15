import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config.js';
import styles from '../styles/NewNegocioStyle.js';

export default function FormularioScreen() {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async () => {
    if (!nombre || !direccion || !telefono || !url) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('LoginScreen');
        return;
      }

      const response = await fetch(API_URL + '/createNegocio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          direccion,
          telefono,
          imagen: url,
        }),
      });

      if (!response.ok) throw new Error('Error al crear el negocio');

      Alert.alert('Éxito', 'Negocio creado correctamente');
      navigation.goBack(); // Regresa a la pantalla anterior
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear el negocio');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre del negocio" />

      <Text style={styles.label}>Dirección</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Dirección" />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" />

      <Text style={styles.label}>URL de Imagen</Text>
      <TextInput style={styles.input} value={url} onChangeText={setUrl} placeholder="https://..." keyboardType="url" />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Negocio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}