import {Stack} from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{headerShown: true}}>
            <Stack.Screen
                name="Login"
                options={{
                    title: 'Login'
                }}
            />
        </Stack>
    );
}