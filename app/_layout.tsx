import {Stack} from 'expo-router';
import React from 'react';
import {CartProvider} from './(tabs)/(cart)/CartContent';

export default function RootLayout() {
    return (
        <CartProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="(admin)"/>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                        // Prevent going back to login/register after logging in
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="(LoginAndRegister)"
                    options={{
                        headerShown: false,
                        // Prevent going back to protected screens
                        gestureEnabled: false
                    }}
                />
            </Stack>
        </CartProvider>
    );
}