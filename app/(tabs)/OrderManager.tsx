import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    ScrollView,
} from 'react-native';

interface Order {
    id: string;
    address: string;
    numberPhone: string;
    status: number;
    dateBuy: string;
    dateArrival: string | null;
    idAccount: number;
    orderDetails: OrderDetail[];
}

interface OrderDetail {
    idOrder: string;
    idProduct: string;
    quantity: number;
    price: number;
}

const OrderManager: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [statusFilter, setStatusFilter] = useState<number | null>(null);
    const [searchPhone, setSearchPhone] = useState('');

    // Status mapping
    const statusMap: { [key: number]: string } = {
        0: 'Pending',
        1: 'Confirmed',
        2: 'Shipping',
        3: 'Shipped',
        4: 'Delivered'
    };

    // Fetch orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://192.168.0.107:9093/order/all');
            setOrders(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update order status
    const handleStatusUpdate = async (orderId: string, newStatus: number) => {
        try {
            await axios.put(`http://192.168.0.107:9093/order/status/${orderId}?newStatus=${newStatus}`);
            Alert.alert('Success', 'Order status updated successfully');
            fetchOrders();
        } catch (err: any) {
            Alert.alert('Error', `Failed to update status: ${err.message}`);
        }
    };

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === null || order.status === statusFilter;
        const matchesPhone = !searchPhone || order.numberPhone.includes(searchPhone);
        return matchesStatus && matchesPhone;
    });

    // Calculate order total
    const calculateOrderTotal = (details: OrderDetail[]) => {
        return details.reduce((sum, detail) => sum + (detail.price * detail.quantity), 0);
    };

    // Format date
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    // Render order details modal
    const OrderDetailsModal = () => (
        <Modal
            visible={isDetailsModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsDetailsModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        {selectedOrder && (
                            <>
                                <Text style={styles.modalTitle}>Order Details</Text>
                                <Text style={styles.detailText}>Order ID: {selectedOrder.id}</Text>
                                <Text style={styles.detailText}>Address: {selectedOrder.address}</Text>
                                <Text style={styles.detailText}>Phone: {selectedOrder.numberPhone}</Text>
                                <Text style={styles.detailText}>Status: {statusMap[selectedOrder.status]}</Text>
                                <Text style={styles.detailText}>Purchase
                                    Date: {formatDate(selectedOrder.dateBuy)}</Text>
                                <Text style={styles.detailText}>Delivery
                                    Date: {formatDate(selectedOrder.dateArrival)}</Text>

                                <Text style={styles.sectionTitle}>Products</Text>
                                {selectedOrder.orderDetails.map((detail, index) => (
                                    <View key={index} style={styles.productDetail}>
                                        <Text>Product ID: {detail.idProduct}</Text>
                                        <Text>Quantity: {detail.quantity}</Text>
                                        <Text>Price: ${detail.price}</Text>
                                        <Text>Subtotal: ${detail.price * detail.quantity}</Text>
                                    </View>
                                ))}

                                <Text style={styles.totalText}>
                                    Total: ${calculateOrderTotal(selectedOrder.orderDetails)}
                                </Text>

                                <View style={styles.statusButtons}>
                                    {Object.entries(statusMap).map(([status, label]) => (
                                        <TouchableOpacity
                                            key={status}
                                            style={[
                                                styles.statusButton,
                                                parseInt(status) === selectedOrder.status && styles.activeStatusButton
                                            ]}
                                            onPress={() => handleStatusUpdate(selectedOrder.id, parseInt(status))}
                                        >
                                            <Text style={styles.statusButtonText}>{label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )}

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsDetailsModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    if (loading) return <Text style={styles.message}>Loading...</Text>;
    if (error) return <Text style={styles.message}>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Management</Text>

            {/* Filters */}
            <View style={styles.filters}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by phone number"
                    value={searchPhone}
                    onChangeText={setSearchPhone}
                />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilter}>
                    <TouchableOpacity
                        style={[styles.filterButton, statusFilter === null && styles.activeFilter]}
                        onPress={() => setStatusFilter(null)}
                    >
                        <Text>All</Text>
                    </TouchableOpacity>
                    {Object.entries(statusMap).map(([status, label]) => (
                        <TouchableOpacity
                            key={status}
                            style={[styles.filterButton, statusFilter === parseInt(status) && styles.activeFilter]}
                            onPress={() => setStatusFilter(parseInt(status))}
                        >
                            <Text>{label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Orders List */}
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.orderCard}
                        onPress={() => {
                            setSelectedOrder(item);
                            setIsDetailsModalVisible(true);
                        }}
                    >
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderId}>Order #{item.id}</Text>
                            <Text style={[
                                styles.statusBadge,
                                {backgroundColor: item.status === 4 ? '#4CAF50' : '#FFA726'}
                            ]}>
                                {statusMap[item.status]}
                            </Text>
                        </View>
                        <Text>Phone: {item.numberPhone}</Text>
                        <Text>Date: {formatDate(item.dateBuy)}</Text>
                        <Text>Total: ${calculateOrderTotal(item.orderDetails)}</Text>
                    </TouchableOpacity>
                )}
            />

            <OrderDetailsModal/>
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
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    filters: {
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    statusFilter: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    filterButton: {
        padding: 8,
        marginRight: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        minWidth: 80,
        alignItems: 'center',
    },
    activeFilter: {
        backgroundColor: '#e3f2fd',
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderId: {
        fontWeight: 'bold',
    },
    statusBadge: {
        padding: 4,
        borderRadius: 4,
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    productDetail: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    statusButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginVertical: 16,
    },
    statusButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
        minWidth: 80,
        alignItems: 'center',
    },
    activeStatusButton: {
        backgroundColor: '#2196F3',
    },
    statusButtonText: {
        color: 'black',
    },
    closeButton: {
        backgroundColor: '#f44336',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 16,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default OrderManager;