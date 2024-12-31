import { Drawer } from 'expo-router/drawer';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [fontsLoaded, fontError] = useFonts({
        // Add any custom fonts here if needed
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Drawer
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#4CAF50',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    drawerStyle: {
                        backgroundColor: '#fff',
                        width: 240,
                    },
                    drawerActiveBackgroundColor: '#4CAF50',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#333',
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Dashboard',
                        title: 'User Dashboard',
                    }}
                />
                <Drawer.Screen
                    name="(tabs)/OrderHistory"
                    options={{
                        drawerLabel: 'Order History',
                        title: 'Order History',
                    }}
                />
                <Drawer.Screen
                    name="(tabs)/PurchasedProducts"
                    options={{
                        drawerLabel: 'Purchased Products',
                        title: 'Purchased Products',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}