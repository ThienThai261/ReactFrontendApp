// App.tsx (or Navigation Setup File)
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderHistory from "@/app/(tabs)/(user)/(tabs)/OrderHistory";
import PurchasedProducts from "@/app/(tabs)/(user)/(tabs)/PurchasedProducts";


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SomeScreen">
                <Stack.Screen name="SomeScreen" component={OrderHistory} />
                <Stack.Screen name="AnotherScreen" component={PurchasedProducts} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
