import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function LoginScreen({ navigation }) {
    const navigateToScreen = (screen) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screen }],
        });
    };

    return (
        <View style={styles.container}>
            <Video
                source={require('../assets/videos/videoplayback.mp4')}
                style={styles.backgroundVideo}
                resizeMode='cover'
                shouldPlay
                isLooping
                isMuted
            />

            <View style={styles.overlay}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.title}>AlhComercio</Text>
                    <Text style={styles.subtitle}>Di hola al comercio Alhaurino</Text>
                </View>
                <View style={styles.containerBotones}>
                    <TouchableOpacity style={[styles.botones, styles.loginButton]} onPress={() => navigation.navigate('EnterScreen')}>
                        <Text style={[styles.textoLogin, styles.buttonText]}>Iniciar sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.botones, styles.registerButton]} onPress={() => navigation.navigate('SingUpScreen')}>
                        <Text style={[styles.textoLogin, styles.buttonText]}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    backgroundVideo: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerTitulo: {
        marginTop: 150,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
    },
    containerBotones: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '65%',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 15,
        color: 'white',
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
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    textoGoogle: {
        color: 'white',
    },
    textoLogin: {
        color: 'white',
    },
});
