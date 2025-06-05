import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config.js';
import styles from '../styles/NewNegocioStyle.js';

export default function FormularioScreen({route}) {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [precioOriginal, setPrecioOriginal] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const negocioId = route?.params?.negocioId;

  const handleSubmit = async () => {
    if (!nombre || !precioOriginal || !precioOferta || !url) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const original = parseFloat(precioOriginal);
    const oferta = parseFloat(precioOferta);

    if (isNaN(original) || isNaN(oferta)) {
      Alert.alert('Error', 'Los precios deben ser números válidos.');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setLoading(false);
        navigation.navigate('LoginScreen');
        return;
      }

      const response = await fetch(API_URL + '/createOferta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          precio_original: original,
          precio_oferta: oferta,
          imagen: url,
          negocio_id: negocioId,
        }),
      });

      if (!response.ok) throw new Error('Error al crear la oferta');

      Alert.alert('Éxito', 'Oferta creada correctamente');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear la oferta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/imagenCreateOferta.png')}
        style={{ width: '100%', height: 300, resizeMode: 'cover', marginBottom: 20 }}
      />

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre de la oferta"
      />

      <Text style={styles.label}>Precio Original</Text>
      <TextInput
        style={styles.input}
        value={precioOriginal}
        onChangeText={setPrecioOriginal}
        placeholder="Precio original de la oferta"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Precio en AlhComercio</Text>
      <TextInput
        style={styles.input}
        value={precioOferta}
        onChangeText={setPrecioOferta}
        placeholder="Precio en AlhComercio"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>URL de Imagen</Text>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="https://..."
        keyboardType="url"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>Crear Oferta</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      )}
    </ScrollView>
  );
}
