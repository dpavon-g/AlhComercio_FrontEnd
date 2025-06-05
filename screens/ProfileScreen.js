import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileStyle.js';
import { API_URL } from '../config.js';

export default function ProfileScreen({ navigation }) {
  const navigateToScreen = (screen) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log("Token JWT no disponible.");
        navigation.navigate('LoginScreen');
        return;
      }
      const response = await fetch(`${API_URL}/getUser`, {
        method: 'GET',
        headers: {
          'Accept-Charset': 'utf-8',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error en la respuesta de la API');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      await AsyncStorage.removeItem('token');
      console.log(error);
      navigation.navigate('LoginScreen');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setData(null);
    fetchData();
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No hay token para cerrar sesión.');
        return;
      }

      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.warn('La API de logout devolvió un error:', response.status);
      } else {
        console.log('Sesión cerrada correctamente en el servidor.');
      }

      await AsyncStorage.removeItem('token');
      navigateToScreen('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const user = data?.user;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <Text style={styles.title}>Perfil</Text>

      {user ? (
        <>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Dinero ahorrado:</Text>
          <Text style={styles.value}>{user.coins} €</Text>

          {user.negocios && user.negocios.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Mis negocios</Text>

              {user.negocios.map((negocio) => (
                <View key={negocio.id} style={styles.businessCard}>
                  <Image source={{ uri: negocio.imagen }} style={styles.businessImage} />
                  <Text style={styles.businessName}>{negocio.nombre}</Text>
                  <Text style={styles.businessAddress}>{negocio.direccion}</Text>
                  <Text style={styles.businessPhone}>{negocio.telefono}</Text>
                </View>
              ))}
            </>
          )}
        </>
      ) : (
        <Text>No se encontraron datos del usuario.</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
