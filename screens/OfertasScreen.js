import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OfertasScreen({ route }) {
  const { otherParam } = route.params;

  return (
    <View style={styles.container}>
      <Text>{otherParam}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
