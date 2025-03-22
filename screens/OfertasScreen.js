import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/OfertasStyle.js';

export default function OfertasScreen({ route }) {
  const { otherParam } = route.params;

  return (
    <View style={styles.container}>
      <Text>{otherParam}</Text>
    </View>
  );
}

