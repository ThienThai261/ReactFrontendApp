import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const API_BASE_URL = "http://192.168.0.107:9093/demo";

export default function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        // Basic validation
        if (!username || !password || !email || !fullname || !phone) {
            setError("All fields are required");
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("email", email);
            formData.append("fullname", fullname);
            formData.append("phone", phone);
            formData.append("status", "1"); // Default active status

            const response = await axios.post(`${API_BASE_URL}/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data === "Saved") {
                Alert.alert(
                    "Registration Successful",
                    "Your account has been created successfully!",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("SignUp"),
                        },
                    ]
                );
                setError("");
            } else {
                setError("Registration failed");
                Alert.alert("Error", "Registration failed. Please try again.");
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || "An error occurred");
                Alert.alert("Registration Error", err.response.data.message);
            } else {
                setError("Unable to connect. Check your internet connection.");
                Alert.alert("Network Error", "Please try again later.");
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <LinearGradient
                    colors={["#6a11cb", "#2575fc"]}
                    style={styles.background}
                />

                <View style={styles.signUpContainer}>
                    <Text style={styles.title}>Create Account</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#aaa"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#aaa"
                        value={fullname}
                        onChangeText={setFullname}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#aaa"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <LinearGradient
                            colors={["#6a11cb", "#b92b27"]}
                            style={styles.signUpButtonGradient}
                        >
                            <Text style={styles.signUpButtonText}>SIGN UP</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.signInText}>
                            Already have an account? Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    signUpContainer: {
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
    signUpButton: {
        width: "100%",
        marginVertical: 20,
    },
    signUpButtonGradient: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    signUpButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    signInText: {
        color: "#6a11cb",
        marginTop: 15,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});