import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TextInput, Modal, TouchableOpacity} from 'react-native';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
import {useRouter} from 'expo-router';

const UserDashboard = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* User Info Section */}
            <View style={styles.userInfo}>
                <FontAwesome name="user-circle" size={60} color="#4caf50"/>
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={styles.username}>Thai Quoc</Text>
                    <Text style={styles.infoText}>Phone: 0123456789</Text>
                    <Text style={styles.infoText}>Email: godslayder2612003@gmail.com</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.changePasswordLink}>Change Password</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.buttonContainer}>
                {/* Order History Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('./(auth)/(tabs)/OrderHistory')}
                >
                    <MaterialIcons name="receipt" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>Order History</Text>
                </TouchableOpacity>

                {/* Purchased Products Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('./(auth)/(tabs)/PurchasedProducts')}
                >
                    <MaterialIcons name="visibility" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>Purchased Products</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={[styles.button, styles.logoutButton]}>
                    <MaterialIcons name="logout" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Change Password Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <TextInput
                            placeholder="Current Password"
                            secureTextEntry
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="New Password"
                            secureTextEntry
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Confirm New Password"
                            secureTextEntry
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.sendCodeButton}>
                            <Text style={styles.sendCodeText}>Send Verification Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 16,
        elevation: 2,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    infoText: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 2,
    },
    changePasswordLink: {
        color: '#4caf50',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    buttonContainer: {
        padding: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4caf50',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    logoutButton: {
        backgroundColor: '#f44336',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 12,
    },
    sendCodeButton: {
        padding: 12,
        backgroundColor: '#4caf50',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 12,
    },
    sendCodeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 12,
        backgroundColor: '#f44336',
        alignItems: 'center',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default UserDashboard;