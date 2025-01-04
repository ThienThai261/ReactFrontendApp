import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {router, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HeaderProps = {
    title?: string; // Optional title to display on the header
};

export default function Header({ title }: HeaderProps) {
    const router = useRouter();

    const handleLogoPress = () => {
        router.push("/"); // Navigate to the home screen (index.tsx at root)
    };

    const handleProfilePress = async () => {
        try {
            const userDetails = await AsyncStorage.getItem("userDetails");
            if (userDetails) {
                // User is logged in, navigate to user detail screen
                router.push("./(tabs)/(user)/userDetail");
            } else {
                // User is not logged in, navigate to login screen
                router.push("./(LoginAndRegister)/Login");
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            router.push("./(auth)/login"); // Fallback to login screen
        }
    };

    const handleCartPress = () => {
        router.push("./(tabs)/(cart)/cart");
    };

    return (
        <View style={styles.headerContainer}>
            {/* Logo */}
            <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
                <Image
                    source={require("@/assets/images/react-logo.png")} // Replace with your logo
                    style={styles.logo}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Title */}
            {title && <Text style={styles.title}>{title}</Text>}

            {/* Profile and Cart Buttons */}
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={handleProfilePress}>
                    <Image
                        source={require("@/assets/images/profile-icon.png")} // Replace with your Profile icon image
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
                    <Image
                        source={require("@/assets/images/cart-icon.png")} // Replace with your Cart icon image
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#3b82f6", // Blue background
        padding: 16,
        elevation: 4, // Shadow effect for Android
        shadowColor: "#000", // Shadow effect for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 40, // Adjust as needed
        height: 40, // Adjust as needed
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        width: 40, // Circle size
        height: 40, // Circle size
        borderRadius: 20, // Make it circular
        backgroundColor: "#fff", // White background
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8, // Spacing between buttons
    },
    icon: {
        width: 24, // Adjust icon size
        height: 24, // Adjust icon size
    },
});
