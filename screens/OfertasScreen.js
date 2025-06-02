import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles/OfertasStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

export default function OfertasScreen({ route }) {
  const { negocio } = route.params;
  const [data, setData] = useState([]);
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
    }
    catch (error) {
      await AsyncStorage.removeItem('token');
      navigation.navigate('LoginScreen');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setData([]);
    fetchData();
  };

  useFocusEffect(
      React.useCallback(() => {
        handleRefresh(); // Esto limpiará y recargará
      }, [])
  );

  return (
    <View style={styles.item}>
      <Image source={{ uri: negocio.imagen }} style={styles.image} />
      <Text style={styles.title}>{negocio.nombre}</Text>
      <Text style={styles.address}>{negocio.direccion}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${negocio.telefono}`)}>
        <Text style={styles.phone}>{negocio.telefono}</Text>
      </TouchableOpacity>
    </View>
  );
}
