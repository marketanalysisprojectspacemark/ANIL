import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // Add this line
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (username && password) {
            try {
                const usersJson = await AsyncStorage.getItem('users');
                const users = usersJson ? JSON.parse(usersJson) : [];

                const userExists = users.some((user) => user.username === username);

                if (userExists) {
                    setError('Username already exists');
                    setSuccess('');
                    return;
                } else {
                    // chek password length and complexity using regex
                    if (password.length < 8) {
                        setError('Password must be at least 8 characters');
                        setSuccess('');
                        return;
                    }
                    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
                        setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
                        setSuccess('');
                        return;
                    }
                }
                setSuccess('Registration successful');
                setError('');
                setTimeout(async () => {
                    // set id and isLoggedIn for the new user
                    // id is a random String of 10 characters
                    const newUser = { username, password, id:  Math.random().toString(36).substring(7), isLoggedIn: true }; // Add id and isLoggedIn for the new user
                    users.push(newUser);
                    await AsyncStorage.setItem('users', JSON.stringify(users));
                    navigation.navigate('Home', { user: newUser});
                }, 1000);


            } catch (error) {
                console.error('Error storing user:', error.message);
                setError('Error registering user');
                setSuccess('');
            }
        }
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
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
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Already have an account? Login here</Text>
                </TouchableOpacity>


                {error ? <Text style={styles.errorText}>{error}</Text> : <Text style={styles.success}>{success}</Text>}


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
    loginButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 25,  // Add marginBottom to create space between buttons
    },

    registerButton: {
     
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    success: {
        color: 'green',
        marginTop: 10,
        alignItems: 'center',
        animation: 'pulse 2s infinite',
    },
});

export default RegisterScreen;
