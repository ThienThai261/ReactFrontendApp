import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from './CartContent';
import { router } from 'expo-router';

const API = "http://192.168.0.107:9093";

const CheckoutScreen = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [userId, setUserId] = useState(null);
    const [showCartDetails, setShowCartDetails] = useState(false);

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

    const CartDetailsModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showCartDetails}
            onRequestClose={() => setShowCartDetails(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Cart Details</Text>
                    <ScrollView>
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={styles.itemDetails}>
                                    <Text>Quantity: {item.quantity}</Text>
                                    <Text>Price: ${item.price}</Text>
                                    <Text>Total: ${item.quantity * item.price}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total Amount:</Text>
                            <Text style={styles.totalAmount}>${getCartTotal()}</Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowCartDetails(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

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
                idProduct: String(item.id),
                quantity: item.quantity,
                price: parseInt(item.price)
            }));

            const orderData = {
                address: `${formData.address} ${formData.aptSuite} ${formData.zipCode}`,
                numberPhone: formData.phoneNumber,
                idAccount: parseInt(userId),
                orderDetails: orderDetails
            };

            console.log('Sending order data:', JSON.stringify(orderData, null, 2));

            const response = await fetch(`${API}/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const responseText = await response.text();
            console.log('API Response:', responseText);

            if (!response.ok) {
                throw new Error(`Failed to create order: ${responseText}`);
            }

            // Clear the cart after successful order
            clearCart();

            Alert.alert(
                'Success',
                'Order placed successfully!',
                [
                    { text: 'OK', onPress: () => router.push('./') }
                ]
            );
        } catch (error) {
            console.error('Detailed error:', error);
            Alert.alert(
                'Error',
                `Failed to create order: ${error.message}. Please try again.`
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.returnButton}>
                <Text style={styles.returnButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Checkout</Text>

            <TouchableOpacity
                style={styles.cartDetailsButton}
                onPress={() => setShowCartDetails(true)}
            >
                <Text style={styles.cartDetailsText}>Show cart details</Text>
                <Text style={styles.cartAmount}>${getCartTotal()}</Text>
            </TouchableOpacity>

            <CartDetailsModal />

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

            <View style={styles.formGroup}>
                <Text style={styles.label}>ZIP Code</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter ZIP code"
                    keyboardType="numeric"
                    value={formData.zipCode}
                    onChangeText={(text) => setFormData({...formData, zipCode: text})}
                />
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
                style={styles.voucherButton}
                onPress={() => router.push('./VoucherScreen')}
            >
                <Text style={styles.voucherButtonText}>Apply Voucher</Text>
            </TouchableOpacity>

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
    returnButton: {
        marginRight: 8,
    },
    returnButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a73e8',
    },
    voucherButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    voucherButtonText: {
        color: '#00bfff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
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
        color: '#00bfff',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    checkoutButton: {
        backgroundColor: '#00bfff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        opacity: 0.7,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    cartItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDetails: {
        marginTop: 5,
    },
    totalContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00bfff',
    },
    closeButton: {
        backgroundColor: '#00bfff',
        padding: 10,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;