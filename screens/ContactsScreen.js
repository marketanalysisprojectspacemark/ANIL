// ContactsScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

  const addContact = () => {
    // Implement adding a contact to the list
    // For simplicity, create a dummy contact with a random ID
    const newContact = { id: Math.random().toString(), name: 'New Contact' };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (id) => {
    // Implement deleting a contact from the list
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  return (
    <View>
      <Text>Contacts</Text>
      <Button title="Add Contact" onPress={addContact} />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteContact(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ContactsScreen;
