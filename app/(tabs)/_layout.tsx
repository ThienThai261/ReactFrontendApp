import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Drawer } from 'expo-router/drawer';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import UserTable from "@/app/(tabs)/UserTable";

// import { createStackNavigator } from '@react-navigation/stack';
// import index from './index'
// import detail from '../screen/detail'


// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//         <Tabs.Screen
//             name="about"  // Correct route name for About screen
//             options={{
//                 title: 'About',
//                 tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.circle.fill" color={color} />,
//             }}
//         />
//         <Tabs.Screen
//             name="ImgHold"  // Ensure this matches the route you are trying to navigate to
//             options={{
//                 title: 'Image Hold',
//                 tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo" color={color} />,
//             }}
//         />
//         <Tabs.Screen
//             name="Index"  // Ensure this matches the route you are trying to navigate to
//             options={{
//                 title: 'Imgchage Hold',
//                 tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo" color={color} />,
//             }}
//         />
//         <Tabs.Screen
//             name="UserTable"  // Ensure this matches the route you are trying to navigate to
//             options={{
//                 title: 'UserTable',
//                 tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo" color={color} />,
//             }}
//         />
//         <Tabs.Screen
//         name="WeatherSceen"  // Ensure this matches the route you are trying to navigate to
//         options={{
//             title: 'Hold',
//             tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo" color={color} />,
//         }}
//     />
//     </Tabs>
//   );
//
// }

// const Stack = createStackNavigator()

// const MyHome = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Home" component={index} />
//             <Stack.Screen name="Detail" component={detail} />
//         </Stack.Navigator>
//     )
// }

export default function Layout() {
    return (
        <Drawer>
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                }}
            />
            <Drawer.Screen
                name="products"
                options={{
                    drawerLabel: 'Products',
                    title: 'Product Manager',
                }}
            />
            <Drawer.Screen
                name="users"
                options={{
                    drawerLabel: 'Users',
                    title: 'User Table',
                }}
            />
        </Drawer>
    );
}
