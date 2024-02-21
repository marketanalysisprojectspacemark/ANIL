import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper'; //npm install react-native-paper
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserListScreen = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the user data from AsyncStorage
        const fetchData = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem('users');
                if (storedUsers) {
                    setUsers(JSON.parse(storedUsers));
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (userId) => {
        // Implement edit logic, e.g., navigate to edit screen with user id
        alert('Edit user with id ' + userId);
    };

    const handleDelete = async (userId) => {
        // Implement delete logic
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleProfile = () => {
        // Navigate to the profile screen
        navigation.navigate('Profile');
    };

    const handleLogout = async () => {
        // Implement logout logic
        navigation.navigate('Login');
    };

    const renderUserItem = ({ item }) => (
        <DataTable.Row key={item.id}>
          
            <DataTable.Cell >
                <TouchableOpacity>
                    <Text>{item.id}</Text>
                </TouchableOpacity>
            </DataTable.Cell>

            <DataTable.Cell>{item.username}</DataTable.Cell>

            <DataTable.Cell >
                <TouchableOpacity>
                   <Text style  = {{color: 'blue'}}  onPress={() => handleEdit(item.id)}  >{item.password}</Text>
                </TouchableOpacity>
            </DataTable.Cell>

        </DataTable.Row>
    );

    return (
        <View style={styles.container}>
            {/* Navigation Bar */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButton} onPress={handleProfile}>
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title >User</DataTable.Title>
                    <DataTable.Title >Password</DataTable.Title>
                </DataTable.Header>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    renderItem={renderUserItem}
                />

               
            </DataTable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    navButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default UserListScreen;
