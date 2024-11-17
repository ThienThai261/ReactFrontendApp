import {Text, View, StyleSheet} from "react-native";
import React from "react";
import {Link, router} from "expo-router";
import ButtonNew from "@/components/ui/ButtonNew";
import HamburgerButton from "@/components/ui/HamburgerButton";

export default function Index() {
    const handlePress = () => {
        alert("Button Pressed!");
    };
    const handleMenuPress = () => {
        // This will open the drawer
        router.push("//(tabs)ProductManager");
    };

    return (
        <View style={styles.container}>
            <View style={styles.linkContainer}>
                <View style={styles.header}>
                    <HamburgerButton onPress={handleMenuPress} color="#000"/>
                </View>
                <Link href="/about" style={styles.link}>
                    Go to About Screen
                </Link>
                <Link href="/ImgHold" style={styles.link}>
                    Go to Image Hold
                </Link>
                <Link href="/WeatherSceen" style={styles.link}>
                    Weather Screen
                </Link>

                <ButtonNew title="Click Me" onPress={handlePress}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
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
