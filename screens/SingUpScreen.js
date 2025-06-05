import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { API_URL } from '../config.js';
import styles from '../styles/SingUpScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const navigateToScreen = (screen) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screen }],
        });
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setpassword_confirmation] = useState('');
    const [loading, setLoading] = useState(false);


    function checkCampos() {
        if (name === '' || email === '' || password === '' || password_confirmation === '') {
            Alert.alert('Error', 'Por favor, rellena todos los campos');
            return false;
        }

        if (password !== password_confirmation) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'El correo electrónico no tiene un formato válido');
            return false;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%._*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            Alert.alert(
                'Error',
                'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial'
            );
            return false;
        }
        return true;
    }

    const createUser = async () => {
        const userData = {
            name,
            email,
            password,
            password_confirmation
        };

        setLoading(true);

        try {
            const response = await fetch(API_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                data = null;
            }
            
            if (!response.ok) {
                let errorMessages = '';
    
                const fieldLabels = {
                    email: 'Correo electrónico',
                    password: 'Contraseña',
                    name: 'Nombre',
                    password_confirmation: 'Confirmación de contraseña'
                };
    


                if (
                    typeof data === 'object' &&
                    data !== null &&
                    !Array.isArray(data) &&
                    Object.keys(data).length > 0
                ) {
                    errorMessages = Object.entries(data)
                        .map(([field, messages]) => {
                            const label = fieldLabels[field] || field;
                            return `${label}: ${messages.join(', ')}`;
                        })
                        .join('\n');
                } else {
                    errorMessages = 'Hubo un problema con la creación del usuario';
                }
    
                throw new Error(errorMessages);
            }
    
            const jwt = data.token;
            if (jwt) {
                await AsyncStorage.setItem('token', jwt);
                console.log('Token guardado:', jwt);
            }
            return true;
        } catch (error) {
            Alert.alert('Error', error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        const validForm = checkCampos();
        if (!validForm) {
            return;
        }

        const success = await createUser();
        if (success) {
            navigateToScreen('HomeTabs');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
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
            <TextInput
                style={styles.input}
                placeholder="Repetir contraseña"
                secureTextEntry
                value={password_confirmation}
                onChangeText={setpassword_confirmation}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => navigation.goBack()}>
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Volver al inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
            {loading && (
                    <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
                  )}
        </View>
    );
}
