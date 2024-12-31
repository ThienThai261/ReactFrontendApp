import {Drawer} from 'expo-router/drawer';
import React from 'react';

export default function AdminLayout() {
  return (
      <Drawer screenOptions={{headerShown: true}}>
        <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Dashboard',
              title: 'Admin Dashboard ',
            }}
        />
        <Drawer.Screen
            name="(tabs)/ProductManager"
            options={{
              drawerLabel: 'Products',
              title: 'Product Manager',
            }}
        />
        <Drawer.Screen
            name="(tabs)/UserTable"
            options={{
              drawerLabel: 'Users',
              title: 'User Table',
            }}
        />
        <Drawer.Screen
            name="(tabs)/OrderManager"
            options={{
              drawerLabel: 'Orders',
              title: 'Order Manager',
            }}
        />
      </Drawer>
  );
}