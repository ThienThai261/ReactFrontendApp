import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import {handleLogout} from "@/app/(tabs)/(user)/(tabs)/handleLogout";


export default function AdminDashboard() {


    const handleUserPress = () => {
        router.push("./(user)/"); // Correctly routes to the index within the (auth) group
    };
    const handleLoginPress = () => {
        router.push("./(LoginAndRegister)/Login"); // Correctly routes to the index within the (auth) group
    };
    const handledetailPress = () => {
        router.push("./home/Home");
    }
    const handleCartPress = () => {
        router.push("./(cart)/CartScreen")
    }
    const handleLogoutPress = async () => {
        await handleLogout();
    };
    return (
        <View style={styles.container}>
            <View style={styles.linkContainer}>

                <Text style={styles.welcomeMessage}>
                    Welcome to the Admin Panel
                </Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogoutPress}
                >
                    <Text style={styles.loginButtonText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeMessage: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    linkContainer: {
        alignItems: "center",
        gap: 10,
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});