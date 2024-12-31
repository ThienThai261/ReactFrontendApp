// OrderHistory.tsx (trong thư mục auth/tabs)
import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';

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
            const response = await axios.get('http://192.168.0.107:9093/order/all');
            setOrders(response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const calculateTotal = (details: OrderDetail[]) => {
        return details.reduce((sum, detail) => sum + (detail.price * detail.quantity), 0);
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff"/>;
    if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Purchase History</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({item: order}) => (
                    <View style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderId}>Order #{order.id}</Text>
                            <Text style={[
                                styles.statusBadge,
                                {backgroundColor: order.status === 4 ? '#4CAF50' : '#FFA726'}
                            ]}>
                                {statusMap[order.status]}
                            </Text>
                        </View>
                        <Text>Purchase Date: {formatDate(order.dateBuy)}</Text>
                        <Text>Delivery Date: {formatDate(order.dateArrival)}</Text>
                        <Text>Total Items: {order.orderDetails.length}</Text>
                        <Text style={styles.totalPrice}>Total: ${calculateTotal(order.orderDetails)}</Text>
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
    productCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
export default OrderHistory;