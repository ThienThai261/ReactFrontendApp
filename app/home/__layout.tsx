import { Stack } from 'expo-router';
import React from 'react';

export default function ProductsLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home'
                }}
            />
        </Stack>
    );
}