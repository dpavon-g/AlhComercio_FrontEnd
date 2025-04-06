import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../config.js';
import styles from '../styles/SingUpScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const navigateToScreen = (screen) => {
        console.log('Navegando a:', screen);
        navigation.reset({
            index: 0,
            routes: [{ name: screen }],
        });
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [JWT_TOKEN, setJWT_TOKEN] = useState(null);

   const obtenerToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setJWT_TOKEN(token);
    };

    useEffect(() => {
        obtenerToken();
    }, []);

    useEffect(() => {
        if (JWT_TOKEN) {
            navigateToScreen('HomeTabs');
        }
    }, [JWT_TOKEN]);

    function checkCampos() {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Por favor, rellena todos los campos');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'El correo electrónico no tiene un formato válido');
            return false;
        }
        return true;
    }

    const login = async () => {
        const userData = {
            email,
            password,
        };
    
        try {
            const response = await fetch(API_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();

            if (!response.ok) {
                let errorMessages = '';
                if (data && typeof data === 'object') {
                    errorMessages = data.error || data.message 
                } else {
                    errorMessages = 'Hubo un error al iniciar sesión';
                }
                throw new Error(errorMessages);
            }
            const jwt = data.token;
            if (jwt) {
                await AsyncStorage.setItem('token', jwt);
            }
            return data;
        } catch (error) {
            Alert.alert('Error', error.message);
            return false;
        }
    };

    const handleLogin = async () => {
        const validForm = checkCampos();
        if (!validForm) {
            return;
        }
    
        const user = await login();
        if (user) {
            // Puedes usar la info del usuario si la necesitas
            console.log('Usuario logueado:', user);
            navigateToScreen('HomeTabs');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => navigation.goBack()}>
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Volver al inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Acceder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
