import {Drawer} from 'expo-router/drawer';
import React from 'react';

export default function AdminLayout() {
    return (
        <Drawer>
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Dashboard',
                    title: 'Admin Dashboard',
                }}
            />
            <Drawer.Screen
                name="(tabs)/products"
                options={{
                    drawerLabel: 'Products',
                    title: 'Product Manager',
                }}
            />
            <Drawer.Screen
                name="(tabs)/users"
                options={{
                    drawerLabel: 'Users',
                    title: 'User Table',
                }}
            />
            <Drawer.Screen
                name="(tabs)/order"
                options={{
                    drawerLabel: 'Order',
                    title: 'Order Manager',
                }}
            />
        </Drawer>
    );
}