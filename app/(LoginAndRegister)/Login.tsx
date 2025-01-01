import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const API_BASE_URL = "http://192.168.0.107:9093/accounts";

export default function LoginAndRegister({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);

            const response = await axios.post(`${API_BASE_URL}/login`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Server response:", response.data);

            if (response.data.success) {
                // Store user details in AsyncStorage
                const userDetails = {
                    isLoggedIn: true,
                    username: response.data.username,
                    email: response.data.email,
                    fullname: response.data.fullname,
                    phone: response.data.phone,
                    id: response.data.id
                };

                await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));

                Alert.alert("Login Success", "Welcome!");
                setError("");
                router.push("../(tabs)/(user)/userDetail");
            } else {
                setError(response.data.message || "Login failed");
                Alert.alert("Login Failed", response.data.message);
            }
        } catch (err) {
            console.error("Error details:", err);
            handleLoginError(err);
        }
    };
    const handleLoginError = (err) => {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                const message = err.response.data.message || "Server returned an error.";
                setError(message);
                Alert.alert("Error", message);
            } else if (err.request) {
                setError("No response from server. Check your connection.");
                Alert.alert("Network Error", "No response from server. Check your connection.");
            } else {
                setError("Request failed. Please try again.");
                Alert.alert("Request Error", "Request failed. Please try again.");
            }
        } else {
            setError("An unexpected error occurred.");
            Alert.alert("Error", "An unexpected error occurred.");
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#6a11cb", "#2575fc"]}
                style={styles.background}
            />
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Login</Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Type your username"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type your password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <LinearGradient
                        colors={["#6a11cb", "#b92b27"]}
                        style={styles.loginButtonGradient}
                    >
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.orText}>Or Sign Up Using</Text>

                <View style={styles.socialButtons}>
                    <TouchableOpacity>
                        <Image
                            source={{
                                uri: "https://img.icons8.com/color/48/facebook.png",
                            }}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={{
                                uri: "https://img.icons8.com/color/48/twitter.png",
                            }}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={{
                                uri: "https://img.icons8.com/color/48/google-logo.png",
                            }}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.signUpText}>Or Sign Up Using</Text>
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
    loginContainer: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 5},
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
    forgotPassword: {
        alignSelf: "flex-end",
        color: "#6a11cb",
        marginVertical: 5,
    },
    loginButton: {
        width: "100%",
        marginVertical: 20,
    },
    loginButtonGradient: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    loginButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    orText: {
        color: "#aaa",
        marginVertical: 10,
    },
    socialButtons: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    socialIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
    signUpText: {
        color: "#6a11cb",
        marginTop: 15,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});
