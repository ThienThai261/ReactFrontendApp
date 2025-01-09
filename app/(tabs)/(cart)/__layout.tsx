import {Stack} from 'expo-router';
import React from 'react';

export default function CartLayout() {
    return (
        <Stack screenOptions={{headerShown: true}}>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Cart'
                }}
            />
            <Stack.Screen
                name="CheckOutScreen"
                options={{
                    title: 'Checkout'
                }}
            />
            <Stack.Screen
                name="VoucherScreen"
                options={{
                    title: 'Voucher'
                }}
            />
        </Stack>
    );
}