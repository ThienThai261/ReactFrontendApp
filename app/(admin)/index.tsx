import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {router} from "expo-router";
import HamburgerButton from "@/components/ui/HamburgerButton";

export default function AdminDashboard() {
    const handleMenuPress = () => {
        router.push("//(admin)/(tabs)/products");
    };

    const handleLoginPress = () => {
        router.push("./(auth)/"); // Correctly routes to the index within the (auth) group
    };
    return (
        <View style={styles.container}>
            <View style={styles.linkContainer}>
                <View style={styles.header}>
                    <HamburgerButton onPress={handleMenuPress} color="#000"/>
                </View>
                <Text style={styles.welcomeMessage}>
                    Welcome to the Admin Panel
                </Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLoginPress}
                >
                    <Text style={styles.loginButtonText}>Go to Login</Text>
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