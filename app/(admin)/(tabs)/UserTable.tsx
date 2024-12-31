import React, {useState, useEffect} from "react";
import axios from "axios";
import {View, Text, TextInput, FlatList, StyleSheet, Button, TouchableOpacity, Alert} from "react-native";

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    fullname: string;
    phone: string;
    status: number;
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
            Alert.alert("Lỗi", "Vui lòng nhập ID.");
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.107:9093/demo/id?id=${searchId}`);
            setSearchResult(response.data);
        } catch (err: any) {
            setSearchResult(null);
            Alert.alert("Không tìm thấy", `Không tìm thấy người dùng với ID: ${searchId}`);
        }
    };

    const updateStatus = async (id: number, currentStatus: number) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        const statusText = newStatus === 1 ? "bình thường" : "bị khóa";

        Alert.alert(
            "Xác nhận thay đổi",
            `Bạn có chắc muốn thay đổi trạng thái tài khoản thành ${statusText}?`,
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        try {
                            await axios.put(`http://192.168.0.107:9093/demo/updateStatus/${id}?status=${newStatus}`);
                            Alert.alert("Thành công", "Đã cập nhật trạng thái tài khoản.");
                            fetchUsers(); // Refresh the list
                            if (searchResult?.id === id) {
                                setSearchResult({...searchResult, status: newStatus});
                            }
                        } catch (err: any) {
                            Alert.alert("Lỗi", "Không thể cập nhật trạng thái tài khoản.");
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderStatusButton = (user: User) => (
        <TouchableOpacity
            style={[
                styles.statusButton,
                {backgroundColor: user.status === 1 ? '#4CAF50' : '#f44336'}
            ]}
            onPress={() => updateStatus(user.id, user.status)}
        >
            <Text style={styles.statusButtonText}>
                {user.status === 1 ? 'Bình thường' : 'Bị khóa'}
            </Text>
        </TouchableOpacity>
    );

    const renderUserCard = (user: User) => (
        <View style={styles.card}>
            <View style={styles.userInfo}>
                <Text style={styles.name}>{user.username}</Text>
                <Text style={styles.fullname}>{user.fullname}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text>{user.phone}</Text>
            </View>
            {renderStatusButton(user)}
        </View>
    );

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>

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

            {searchResult && renderUserCard(searchResult)}

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => renderUserCard(item)}
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
        flexDirection: "row",
        padding: 16,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        justifyContent: "space-between",
        alignItems: "center",
    },
    userInfo: {
        flex: 1,
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
    statusButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginLeft: 8,
    },
    statusButtonText: {
        color: "white",
        fontWeight: "bold",
    }
});

export default UserTable;