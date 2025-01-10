import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const API_BASE_URL = "http://192.168.0.107:9093/accounts";

export default function ForgetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async () => {
        try {
            if (!email) {
                setError("Please enter your email address.");
                Alert.alert("Error", "Email is required.");
                return;
            }

            const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });

            if (response.data.success) {
                Alert.alert(
                    "Success",
                    "A password reset link has been sent to your email."
                );
                setError("");
                setEmail("");
                navigation.goBack();
            } else {
                setError(response.data.message || "Failed to send reset link.");
                Alert.alert("Error", response.data.message || "Failed to send reset link.");
            }
        } catch (err) {
            console.error("Error details:", err);
            if (axios.isAxiosError(err) && err.response) {
                const message = err.response.data.message || "Server returned an error.";
                setError(message);
                Alert.alert("Error", message);
            } else {
                setError("An unexpected error occurred.");
                Alert.alert("Error", "An unexpected error occurred.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#6a11cb", "#2575fc"]}
                style={styles.background}
            />

            <View style={styles.formContainer}>
                <Text style={styles.title}>Forgot Password</Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                    <LinearGradient
                        colors={["#6a11cb", "#b92b27"]}
                        style={styles.resetButtonGradient}
                    >
                        <Text style={styles.resetButtonText}>Reset Password</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    formContainer: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 16,
        color: "#333",
    },
    resetButton: {
        width: "100%",
        marginVertical: 20,
    },
    resetButtonGradient: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    resetButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});
