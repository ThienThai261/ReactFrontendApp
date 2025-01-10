import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./SignUp";
import Login from "./Login";
import ForgetPasswordScreen from "@/app/(LoginAndRegister)/ForgetPassword";


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignUp">
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
