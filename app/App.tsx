// App.tsx
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import ProductManager from './(tabs)/ProductManager';
import UserTable from './(tabs)/UserTable';
import HamburgerButton from '@/components/ui/HamburgerButton';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={({navigation}) => ({
                    headerLeft: () => (
                        <HamburgerButton
                            onPress={() => navigation.openDrawer()}
                            color="#000"
                        />
                    ),
                })}
            >
                <Drawer.Screen
                    name="Products"
                    component={ProductManager}
                    options={{
                        title: 'Product Manager'
                    }}
                />
                <Drawer.Screen
                    name="Users"
                    component={UserTable}
                    options={{
                        title: 'User Table'
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}