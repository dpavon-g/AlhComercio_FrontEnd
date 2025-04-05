import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../config.js';
import styles from '../styles/SingUpScreen.js';

export default function LoginScreen({ navigation }) {
    const navigateToScreen = (screen) => {
        console.log('Navegando a:', screen);
        navigation.reset({
            index: 0,
            routes: [{ name: screen }],
        });
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setpassword_confirmation] = useState('');

    function checkCampos() {
        console.log('Campos:', {email, password});
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
            const response = await fetch(API_URL + '/checkLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
    
            if (!response.ok) {
                const errors = data.message;
                if (errors) {
                    let errorMessages = '';
                    errorMessages = errors;
                    throw new Error(errorMessages);
                } else {
                    throw new Error(data.message || 'Hubo un error al iniciar sesión');
                }
            }
            return true;
        } catch (error) {
            console.error('Hubo un error al iniciar sesión:', error.message);
            Alert.alert('Error', error.message);
            return false;
        }
    };

    const handleLogin = async () => {
        const validForm = checkCampos();
        if (!validForm) {
            return;
        }

        const success = await login();
        if (success) {
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
