import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';

interface Product {
    product: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        material?: string;
        size?: string;
    };
    imageUrls: string[];
    thumbnailUrl: string;
}

interface PurchasedProduct {
    productId: string;
    totalQuantity: number;
    lastPurchaseDate: string;
    productDetails: Product | null;
}

const PurchasedProducts = () => {
    const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPurchasedProducts();
    }, []);

    const fetchPurchasedProducts = async () => {
        try {
            setLoading(true);
            // Fetch all orders first
            const ordersResponse = await axios.get('http://192.168.0.107:9093/order/all');
            const orders = ordersResponse.data;

            // Create a map to store product purchase info
            const productMap = new Map<string, PurchasedProduct>();

            // Process all orders to get product purchase history
            for (const order of orders) {
                for (const detail of order.orderDetails) {
                    const existing = productMap.get(detail.idProduct);
                    if (existing) {
                        existing.totalQuantity += detail.quantity;
                        if (order.dateBuy > existing.lastPurchaseDate) {
                            existing.lastPurchaseDate = order.dateBuy;
                        }
                    } else {
                        productMap.set(detail.idProduct, {
                            productId: detail.idProduct,
                            totalQuantity: detail.quantity,
                            lastPurchaseDate: order.dateBuy,
                            productDetails: null
                        });
                    }
                }
            }

            // Fetch product details for each purchased product
            const productsWithDetails = await Promise.all(
                Array.from(productMap.values()).map(async (item) => {
                    try {
                        const productResponse = await axios.get(`http://192.168.0.107:9093/product/${item.productId}`);
                        return {
                            ...item,
                            productDetails: productResponse.data
                        };
                    } catch (err) {
                        return item;
                    }
                })
            );

            setPurchasedProducts(productsWithDetails);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff"/>;
    if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Purchased Products</Text>
            <FlatList
                data={purchasedProducts}
                keyExtractor={(item) => item.productId}
                renderItem={({item}) => (
                    <View style={styles.productCard}>
                        <Text style={styles.productName}>
                            {item.productDetails?.product.name || 'Unknown Product'}
                        </Text>
                        <Text>Total Purchased: {item.totalQuantity}</Text>
                        <Text>Last Purchase: {new Date(item.lastPurchaseDate).toLocaleDateString()}</Text>
                        <Text>Price: ${item.productDetails?.product.price || 'N/A'}</Text>
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
export default PurchasedProducts;