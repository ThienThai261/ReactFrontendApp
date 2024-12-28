import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native';
import { Feather } from "@expo/vector-icons"
import React from 'react';

export default function App() {
const [email,setEmail] = React.useState<String>("");
const [password,setPassword] = React.useState<String>("");
  const [passwordIsVisible, setPasswordIsVisible] = 
  React.useState<Boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView 
      contentContainerStyle={{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <View style={styles.content}>
       <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="mail" size={22} color="#7C808D" />
            </View>
            <TextInput 
            style={styles.input} 
            placeholder="Email ID"
            placeholderTextColor="#7C808D"
            selectionColor="#3662AA"
            onChangeText={setEmail}
            value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="lock" size={22} color="#7C808D" />
            </View>
            <TextInput 
            style={styles.input} 
            placeholder="Password"
            secureTextEntry={!passwordIsVisible}
            placeholderTextColor="#7C808D"
            selectionColor="#3662AA"
            onChangeText={setPassword}
            value={password}
            />
            <TouchableOpacity style={styles.passwordVisibleButton} onPress={() => setPasswordIsVisible(!passwordIsVisible)} >
              <Feather 
              name={passwordIsVisible ? "eye":"eye-off"} 
              size={20} 
              color="#7C808D"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotpasswordButton}>
            <Text style={styles.forgotpasswordButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.LoginButton}>
            <Text style={styles.LoginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>
          <TouchableOpacity style={styles.GoogleButton}>
            <Image 
            style={styles.goolelogo} 
            source={require("./assets/google-logo.png")} 
            />
            <Text style={styles.GoogleButtonText}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RegisterButton}>
            <Text style={styles.RegisterButtonText}>
              Not have an account yet? <Text style={styles.RegisterButtonTextHighlight}>Register now!</Text>
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "flow",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  icon: {
    marginRight: 15,
  },
  input: {
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 10,
    borderBottomColor: "#eee",
    fontSize: 16,
  },
  passwordVisibleButton: {
    position: "absolute",
    right: 0,
  },
  forgotpasswordButton: {
    alignSelf: "flex-end",
  },
  forgotpasswordButtonText: {
    color: "#3662AA",
    fontSize: 16,
    fontWeight: "500",
  },
  LoginButton: {
    backgroundColor:"#3662AA",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  LoginButtonText: {
    color:"#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  orLine: {
    height: 1,
    backgroundColor: "#eee",
    flex: 1,
  },
  orText: {
    color: "#7C808D",
    marginRight: 10,
    marginLeft: 10,
    fontSize: 14,
  },
  GoogleButton: {
    backgroundColor: "#F2F6F2",
    padding: 14,
    borderRadius: 10,
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "center",
     position: "relative",
  },
  GoogleButtonText: {
    color: "#4E5867",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  goolelogo: {
    width: 20.03,
    height: 20.44,
    position: "absolute",
    left: 14,
  },
  RegisterButton: {
    alignSelf: "center",
    marginTop: 40,
  },
  RegisterButtonText: {
    fontSize: 16,
    color: "#7C808D",
  },
  RegisterButtonTextHighlight: {
    fontSize: 16,
    color: "#3662AA",
    fontWeight: "500",
  }
});
