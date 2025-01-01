import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReturnButton from "@/components/ui/ReturnButton";

interface Order {
    id: string;
    address: string;
    numberPhone: string;
    status: number;
    dateBuy: string;
    dateArrival: string | null;
    orderDetails: OrderDetail[];
}

interface OrderDetail {
    idOrder: string;
    idProduct: string;
    quantity: number;
    price: number;
}

const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const statusMap: { [key: number]: string } = {
        0: 'Pending',
        1: 'Confirmed',
        2: 'Shipping',
        3: 'Shipped',
        4: 'Delivered'
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userDetails');
            if (!token) {
                throw new Error('User is not logged in');
            }

            // Assuming the token contains the account ID or use the token to fetch it
            const userDetails = JSON.parse(token);
            const accountId = userDetails.id;

            const response = await axios.get(`http://192.168.0.107:9093/order/account/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setOrders(response.data);
            } else {
                setError('Failed to fetch orders. Please try again later.');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const calculateTotal = (details: OrderDetail[]) => {
        return details.reduce((sum, detail) => sum + detail.price * detail.quantity, 0);
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

    if (orders.length === 0) {
        return <Text style={styles.noOrdersText}>You have no past orders.</Text>;
    }

    return (
        <View style={styles.container}>
            <ReturnButton></ReturnButton>
            <Text style={styles.title}>Purchase History</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item: order }) => (
                    <View style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderId}>Order #{order.id}</Text>
                            <Text
                                style={[
                                    styles.statusBadge,
                                    {
                                        backgroundColor:
                                            order.status === 4 ? '#4CAF50' : '#FFA726',
                                    },
                                ]}
                            >
                                {statusMap[order.status]}
                            </Text>
                        </View>
                        <Text>Purchase Date: {formatDate(order.dateBuy)}</Text>
                        <Text>Delivery Date: {formatDate(order.dateArrival)}</Text>
                        <Text>Total Items: {order.orderDetails.length}</Text>
                        <Text style={styles.totalPrice}>
                            Total: ${calculateTotal(order.orderDetails).toFixed(2)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    noOrdersText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        color: 'white',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
});

export default OrderHistory;
