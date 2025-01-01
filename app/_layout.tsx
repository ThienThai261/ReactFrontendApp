import {Stack} from 'expo-router';
import React from 'react';

export default function RootLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="(admin)"/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>

        </Stack>
    );
}