import {Tabs} from 'expo-router';
import React from 'react';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="order-history"
                options={{
                    title: 'Order History',
                    headerShown: true
                }}
            />
            <Tabs.Screen
                name="purchased-products"
                options={{
                    title: 'Purchased Products',
                    headerShown: true
                }}
            />
        </Tabs>
    );
}