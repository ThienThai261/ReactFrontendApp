import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { CartProvider } from './(tabs)/(cart)/CartContent';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <CartProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(admin)" />
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                            // Prevent going back to login/register after logging in
                            gestureEnabled: false,
                        }}
                    />
                    <Stack.Screen
                        name="(LoginAndRegister)"
                        options={{
                            headerShown: false,
                            // Prevent going back to protected screens
                            gestureEnabled: false,
                        }}
                    />
                </Stack>
            </CartProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
