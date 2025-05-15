import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles/OfertasStyle.js';

export default function OfertasScreen({ route }) {
  const { negocio } = route.params;

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
