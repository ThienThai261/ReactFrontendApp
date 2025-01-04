import {View, Text, ScrollView, StyleSheet, TextInput, Modal, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
import {router} from 'expo-router';
import HamburgerButton from "@/components/ui/HamburgerButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {handleLogout} from "@/app/(tabs)/(user)/(tabs)/handleLogout";
import Header from "@/components/ui/Header";
interface UserDetails {
    username: string;
    email: string;
    fullname: string;
    numberphone: string;
    id: number;
}
export default function UserDashboard() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadUserDetails();
    }, []);
    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const loadUserDetails = async () => {
        try {
            setIsLoading(true);
            const userDetailsString = await AsyncStorage.getItem("userDetails");
            if (userDetailsString) {
                const details = JSON.parse(userDetailsString);
                setUserDetails(details);
            }
        } catch (error) {
            console.error("Error loading user details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoutPress = async () => {
        await handleLogout();
    };

    const handlePurchasedProductsPress = () => {
        router.push("./(tabs)/PurchasedProducts");
    };

    const handleOrderHistoryPress = () => {
        router.push("./(tabs)/OrderHistory");
    };

    const handleChangePasswordPress = () => {
        setModalVisible(true);
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title="Match Your Style" />
            <View style={styles.userInfo}>
                <FontAwesome name="user-circle" size={60} color="#4caf50"/>
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={styles.username}>
                        {userDetails?.fullname || 'No name available'}
                    </Text>
                    <Text style={styles.infoText}>
                        Phone: {userDetails?.numberphone || 'No phone available'}
                    </Text>
                    <Text style={styles.infoText}>
                        Email: {userDetails?.email || 'No email available'}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleChangePasswordPress}>
                    <Text style={styles.changePasswordLink}>Change Password</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleOrderHistoryPress}
                >
                    <MaterialIcons name="receipt" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>Order History</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePurchasedProductsPress}
                >
                    <MaterialIcons name="visibility" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>Purchased Products</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={handleLogoutPress}
                >
                    <MaterialIcons name="logout" size={20} color="#fff"/>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal remains the same */}
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
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
