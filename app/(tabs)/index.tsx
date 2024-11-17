import {Text, View, StyleSheet} from "react-native";
import React from "react";
import {Link, router} from "expo-router";
import ButtonNew from "@/components/ui/ButtonNew";
import HamburgerButton from "@/components/ui/HamburgerButton";

export default function Index() {

    const handleMenuPress = () => {

        router.push("//(tabs)ProductManager");
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
        top: 40, // Adjust this value based on your needs
        left: 20,
        zIndex: 1,
    },
    linkContainer: {
        alignItems: "center",
        gap: 10,
    },
    link: {
        color: "blue",
        fontSize: 16,
        marginVertical: 8,
    },
});
