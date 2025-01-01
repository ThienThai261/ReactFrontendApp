import {Tabs} from 'expo-router';
import React from 'react';

export default function UserTabsLayout() {
    return (
        <Tabs screenOptions={{headerShown: true}}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'User Profile'
                }}
            />
            <Tabs.Screen
                name="(tabs)/OrderHistory"
                options={{
                    title: 'Order History'
                }}
            />
            <Tabs.Screen
                name="(tabs)/PurchasedProducts"
                options={{
                    title: 'Purchased Products'
                }}
            />
        </Tabs>
    );
}