import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from './CartContent';
import { router } from 'expo-router';

const API = "http://192.168.0.107:9093";

const CheckoutScreen = () => {
    const { cartItems, getCartTotal } = useCart();
    const [userId, setUserId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        address: '',
        aptSuite: '',
        zipCode: '',
        phoneNumber: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const userDetails = await AsyncStorage.getItem('userDetails');
            if (userDetails) {
                const user = JSON.parse(userDetails);
                setUserId(user.id);
            } else {
                Alert.alert(
                    'Authentication Required',
                    'Please login to continue with checkout',
                    [
                        { text: 'OK', onPress: () => router.push('/(LoginAndRegister)/Login') }
                    ]
                );
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        }
    };

    const validateForm = () => {
        if (!formData.email || !formData.fullName || !formData.address ||
            !formData.zipCode || !formData.phoneNumber) {
            Alert.alert('Error', 'Please fill in all required fields');
            return false;
        }
        if (!formData.email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return false;
        }
        if (formData.zipCode.length < 5) {
            Alert.alert('Error', 'Please enter a valid ZIP code');
            return false;
        }
        return true;
    };

    const createOrder = async () => {
        if (!userId) {
            Alert.alert('Error', 'Please login to continue');
            return;
        }

        if (!validateForm()) return;

        setLoading(true);
        try {
            const orderDetails = cartItems.map(item => ({
                idProduct: item.id,
                quantity: item.quantity,
                price: item.price
            }));

            const orderData = {
                address: `${formData.address} ${formData.aptSuite} ${formData.zipCode}`,
                numberPhone: formData.phoneNumber,
                idAccount: userId,
                orderDetails: orderDetails
            };

            const response = await fetch(`${API}/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const result = await response.json();
            Alert.alert(
                'Success',
                'Order placed successfully!',
                [
                    { text: 'OK', onPress: () => router.push('./(tabs)') }
                ]
            );
        } catch (error) {
            console.error('Error creating order:', error);
            Alert.alert('Error', 'Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Checkout</Text>

            <View style={styles.stepsContainer}>
                <Text style={[styles.step, styles.activeStep]}>1</Text>
                <Text style={styles.stepDivider}></Text>
                <Text style={styles.step}>2</Text>
                <Text style={styles.stepDivider}></Text>
                <Text style={styles.step}>3</Text>
            </View>

            <TouchableOpacity style={styles.cartDetailsButton}>
                <Text style={styles.cartDetailsText}>Show cart details</Text>
                <Text style={styles.cartAmount}>${getCartTotal()}</Text>
            </TouchableOpacity>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email@example.com"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => setFormData({...formData, email: text})}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChangeText={(text) => setFormData({...formData, fullName: text})}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChangeText={(text) => setFormData({...formData, address: text})}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Apt, Suite, Bldg (optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Optional"
                    value={formData.aptSuite}
                    onChangeText={(text) => setFormData({...formData, aptSuite: text})}
                />
            </View>

            <View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.zipInput]}
                    placeholder="ZIP"
                    keyboardType="numeric"
                    value={formData.zipCode}
                    onChangeText={(text) => setFormData({...formData, zipCode: text})}
                />
                <Text style={styles.city}>Chicago, IL</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(123) 456-7890"
                    keyboardType="phone-pad"
                    value={formData.phoneNumber}
                    onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
                />
            </View>

            <TouchableOpacity
                style={[styles.checkoutButton, loading && styles.disabledButton]}
                onPress={createOrder}
                disabled={loading}
            >
                <Text style={styles.checkoutButtonText}>
                    {loading ? 'Processing...' : 'Place Order'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    step: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ccc',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ccc',
    },
    activeStep: {
        borderColor: '#00bfff',
        color: '#00bfff',
    },
    stepDivider: {
        width: 40,
        height: 2,
        backgroundColor: '#ccc',
    },
    cartDetailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    cartDetailsText: {
        fontSize: 16,
        color: '#333',
    },
    cartAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    zipInput: {
        flex: 1,
        marginRight: 10,
    },
    city: {
        flex: 2,
        fontSize: 16,
        color: '#333',
    },
    disabledButton: {
        opacity: 0.7,
    },
    checkoutButton: {
        marginTop: 20,
        backgroundColor: '#00bfff',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },

    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;