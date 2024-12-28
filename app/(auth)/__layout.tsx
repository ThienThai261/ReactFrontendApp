import {Stack} from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'User Dashboard',
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}