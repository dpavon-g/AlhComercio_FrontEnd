import React, { useState, useEffect } from 'react';
import { Linking, TouchableOpacity, View, Text, ActivityIndicator, FlatList, StyleSheet, RefreshControl, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import styles from '../styles/HomeStyle.js';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.68.109:8000/api/getEstablecimientos', {
        headers: {
          'Accept-Charset': 'utf-8',
        },
      });
      if (!response.ok) throw new Error('Error en la respuesta de la API');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
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
    setData([]);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: 120,  // Ajusta la altura del ítem
          offset: 120 * index,
          index,
        })}
        windowSize={5}
        initialNumToRender={10}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['blue']} />
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.address}>{item.direccion}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.telefono}`)}>
              <Text style={styles.phone}>{item.telefono}</Text>
            </TouchableOpacity>
            <Button
              onPress={() => navigation.navigate('Detalles', { itemId: item.id, otherParam: item.nombre })}
            >
              Ver Ofertas
            </Button>
          </View>
        )}
      />
    </View>
  );
}
