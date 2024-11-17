import React, {useState, useEffect} from "react";
import axios from "axios";
import {View, Text, TextInput, FlatList, StyleSheet, Button} from "react-native";

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    fullname: string;
    phone: string;
    status: boolean;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchResult, setSearchResult] = useState<User | null>(null);
    const [searchId, setSearchId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://192.168.0.107:9093/demo/all");
            setUsers(response.data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    const searchById = async () => {
        if (!searchId) {
            alert("Please enter an ID.");
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.102:8080/demo/id?id=${searchId}`);
            setSearchResult(response.data);
        } catch (err: any) {
            setSearchResult(null);
            alert(`No user found with ID: ${searchId}`);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>

            {/* Search by ID Section */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter User ID"
                    keyboardType="numeric"
                    value={searchId}
                    onChangeText={setSearchId}
                />
                <Button title="Search" onPress={searchById}/>
            </View>

            {searchResult && (
                <View style={styles.card}>
                    <Text style={styles.name}>{searchResult.username}</Text>
                    <Text style={styles.fullname}>{searchResult.fullname}</Text>
                    <Text style={styles.email}>{searchResult.email}</Text>
                    <Text>{searchResult.phone}</Text>
                </View>
            )}

            {/* List of All Users */}
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.username}</Text>
                        <Text style={styles.fullname}>{item.fullname}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                        <Text>{item.phone}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginRight: 8,
    },
    card: {
        flexDirection: "column",
        padding: 16,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    fullname: {
        fontSize: 14,
        color: "#6c757d",
        marginBottom: 8,
    },
    email: {
        fontSize: 14,
        color: "#6c757d",
    },
});

export default UserTable;
