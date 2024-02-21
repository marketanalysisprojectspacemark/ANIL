import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        
        if (username && password) {
            try {
                const usersJson = await AsyncStorage.getItem('users');
                const users = usersJson ? JSON.parse(usersJson) : [];

                const user = users.find((user) => user.username === username && user.password === password);
                // const user = users.find((user) => user.username === username );

                if (user) {
                    users.map((user) => {
                        if (user.username === username) {
                            user.isLoggedIn = true;
                        }
                    });

                    setError('');
                    navigation.navigate('Home', { user });
                } else {
                    setError('Invalid username or password');
                }
            } catch (error) {
                console.error('Error retrieving users:', error.message);
                setError('Error during login');
            }
        }
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Don't have an account? Register here</Text>
                </TouchableOpacity>


                {error ? <Text style={styles.errorText}>{error}</Text> : null}

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,  // Add marginBottom to create space between buttons
    },

    registerButton: {
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginScreen;
