import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Button,
    Alert,
    Modal,
    TouchableOpacity, KeyboardAvoidingView
} from "react-native";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchResult, setSearchResult] = useState<Product | null>(null);
    const [searchId, setSearchId] = useState<string>("");
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [newProduct, setNewProduct] = useState({
        id: "",
        name: "",
        price: "",
        description: "",
        quantity: "",
    });
    const handleUpdatePress = (product: Product) => {
        setSelectedProduct(product);
        setNewProduct({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            description: product.description,
            quantity: product.quantity.toString(),
        });
        setIsUpdateModalVisible(true);
    };
    const addProduct = async () => {
        const {name, price, description, quantity} = newProduct;

        if (!name || !price || !description || !quantity) {
            alert("Please fill in all product fields.");
            return;
        }

        try {
            await axios.post("http://192.168.0.107:9093/product/add", null, {
                params: {
                    name,
                    price: parseFloat(price),
                    description,
                    quantity: parseInt(quantity, 10),
                },
            });
            alert("Product added successfully!");
            setNewProduct({id: "", name: "", price: "", description: "", quantity: ""});
            fetchProducts();
        } catch (err: any) {
            alert(`Failed to add product: ${err.message}`);
        }
    };

    const updateProduct = async () => {
        if (!selectedProduct) return;

        try {
            await axios.put(`http://192.168.0.107:9093/product/update/${selectedProduct.id}`, null, {
                params: {
                    name: newProduct.name,
                    price: parseFloat(newProduct.price),
                    description: newProduct.description,
                    quantity: parseInt(newProduct.quantity, 10),
                },
            });
            alert("Product updated successfully!");
            setIsUpdateModalVisible(false);
            fetchProducts();
        } catch (err: any) {
            alert(`Failed to update product: ${err.message}`);
        }
    };
    const AddProductModal = () => (
        <Modal
            visible={isAddModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsAddModalVisible(false)}
        >
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Product</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChangeText={(text) => setNewProduct({...newProduct, name: text})}
                    />
                    {/* Other inputs */}
                    <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={() => setIsAddModalVisible(false)}/>
                        <Button title="Add" onPress={addProduct}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>

    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://192.168.0.107:9093/product/all");
            setProducts(response.data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };
    const UpdateProductModal = () => (
        <Modal
            visible={isUpdateModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsUpdateModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Update Product</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChangeText={(text) => setNewProduct({...newProduct, name: text})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={newProduct.price}
                        onChangeText={(text) => setNewProduct({...newProduct, price: text})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={newProduct.description}
                        onChangeText={(text) => setNewProduct({...newProduct, description: text})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantity"
                        keyboardType="numeric"
                        value={newProduct.quantity}
                        onChangeText={(text) => setNewProduct({...newProduct, quantity: text})}
                    />
                    <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={() => setIsUpdateModalVisible(false)}/>
                        <Button title="Update" onPress={updateProduct}/>
                    </View>
                </View>
            </View>
        </Modal>
    );

    const searchById = async () => {
        if (!searchId) {
            alert("Please enter an ID.");
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.107:9093/product/${searchId}`);
            setSearchResult(response.data);
        } catch (err: any) {
            setSearchResult(null);
            alert(`No product found with ID: ${searchId}`);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Manager</Text>

            {/* Search by ID Section */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Product ID"
                    keyboardType="numeric"
                    value={searchId}
                    onChangeText={setSearchId}
                />
                <Button title="Search" onPress={searchById}/>
            </View>

            {searchResult && (
                <View style={styles.card}>
                    <Text style={styles.name}>{searchResult.id}</Text>
                    <Text style={styles.name}>{searchResult.name}</Text>
                    <Text>Price: ${searchResult.price.toFixed(2)}</Text>
                    <Text>{searchResult.description}</Text>
                    <Text>Quantity: {searchResult.quantity}</Text>
                </View>
            )}

            {/* List of All Products */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <View style={styles.productInfo}>
                            <Text style={styles.name}>{item.id}</Text>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text>Price: ${item.price.toFixed(2)}</Text>
                            <Text>{item.description}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => handleUpdatePress(item)}
                        >
                            <Text style={styles.updateButtonText}>✎</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setIsAddModalVisible(true)}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>

            <AddProductModal/>
            <UpdateProductModal/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        marginRight: 8,
    },
    card: {
        flexDirection: "row",
        padding: 16,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    productInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    floatingButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    floatingButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    updateButton: {
        padding: 8,
        justifyContent: 'center',
    },
    updateButtonText: {
        fontSize: 20,
        color: '#007AFF',
    },
});

export default ProductManager;
