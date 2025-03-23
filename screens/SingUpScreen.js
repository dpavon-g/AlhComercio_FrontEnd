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
        console.log('Campos:', { name, email, password, password_confirmation });
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
    
        try {
            const response = await fetch(API_URL + '/createUser', {
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
                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            errorMessages += `${key}: ${errors[key].join(', ')}\n`;
                        }
                    }
                    throw new Error(errorMessages);
                } else {
                    throw new Error(data.message || 'Hubo un problema con la creación del usuario');
                }
            }
    
            return true;
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
            Alert.alert('Error', error.message);
            return false;
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
            <Text style={styles.subtitle}>Di hola al comercio Alhaurino</Text>
            
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
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Volver al login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
