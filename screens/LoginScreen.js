import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const navigateToScreen = (screen) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      
      <TouchableOpacity style={[styles.botones, styles.googleButton]} onPress={() => navigateToScreen('HomeTabs')}>
        <Text style={[styles.textoGoogle, styles.buttonText]}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.botones, styles.loginButton]} onPress={() => navigateToScreen('HomeTabs')}>
        <Text style={[styles.textoLogin, styles.buttonText]}>Iniciar sesión</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.botones, styles.registerButton]} onPress={() => navigateToScreen('HomeTabs')}>
        <Text style={[styles.textoLogin, styles.buttonText]}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#DB4437',
    color: 'white'
  },
  loginButton: {
    backgroundColor: '#4285F4',
  },
  registerButton: {
    backgroundColor: '#34A853',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botones: {
    padding: 15,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    marginBottom: 10,
  },
  textoGoogle: {
    color: 'white'
  },
  textoLogin: {
    color: 'white',
  },
});
