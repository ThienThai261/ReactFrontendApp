import {Tabs} from 'expo-router';
import React from 'react';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{headerShown: true}}>
            <Tabs.Screen
                name="(cart)"
                options={{
                    headerShown: true,
                    title: 'Cart'
                }}
            />
            <Tabs.Screen
                name="(user)"
                options={{
                    headerShown: true,
                    title: 'User'
                }}
            />
        </Tabs>
    );
}