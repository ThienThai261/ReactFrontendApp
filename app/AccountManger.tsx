import React, {useState} from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

interface Account {
    id: number;
    username: string;
    email: string;
}

const AccountManager = () => {
    // State to hold the list of accounts
    const [accounts, setAccounts] = useState<Account[]>([
        {id: 1, username: 'john_doe', email: 'john@example.com'},
        {id: 2, username: 'jane_smith', email: 'jane@example.com'},
    ]);

    // States for adding a new account
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');

    // Add a new account
    const addAccount = () => {
        if (newUsername && newEmail) {
            const newAccount: Account = {
                id: accounts.length + 1,  // Automatically generate a new ID
                username: newUsername,
                email: newEmail,
            };

            setAccounts([...accounts, newAccount]); // Add the new account to the list
            setNewUsername('');  // Reset input fields
            setNewEmail('');
        }
    };

    // Delete an account by id
    const deleteAccount = (id: number) => {
        setAccounts(accounts.filter(account => account.id !== id));  // Remove the account from the list
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account Manager</Text>

            {/* Form to add a new account */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={newUsername}
                onChangeText={setNewUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={newEmail}
                onChangeText={setNewEmail}
            />
            <Button title="Add Account" onPress={addAccount}/>

            {/* List of accounts */}
            <FlatList
                data={accounts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.accountContainer}>
                        <Text style={styles.accountText}>{item.username} ({item.email})</Text>
                        <TouchableOpacity onPress={() => deleteAccount(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    accountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    accountText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#ff0000',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
    },
});

export default AccountManager;
