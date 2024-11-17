import React, {useState, useEffect, useCallback} from "react";
import {Camera, Image as ImageIcon} from "lucide-react";
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
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    Platform,
    ActivityIndicator,
    ScrollView,
    SafeAreaView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

const API_BASE_URL = "http://192.168.0.107:9093";

// Interfaces
interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    material?: string;
    size?: string;
    gender?: string;
    status?: number;
    id_category: number;
    thumbnailUrl?: string;
    imageUrls?: string[];
}

interface ProductFormData {
    id: string;
    name: string;
    price: string;
    quantity: string;
    material?: string;
    size?: string;
    gender?: string;
    status?: string;
    id_category: string;
}

// Product Form Modal Component
const ProductFormModal = ({
                              isVisible,
                              onClose,
                              onSubmit,
                              title,
                              initialData,
                              isLoading
                          }: {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => void;
    title: string;
    initialData: ProductFormData;
    isLoading: boolean;
}) => {
    const [localFormData, setLocalFormData] = useState<ProductFormData>(initialData);

    useEffect(() => {
        setLocalFormData(initialData);
    }, [initialData]);

    const handleSubmit = () => {
        if (!localFormData.name || !localFormData.price || !localFormData.quantity || !localFormData.id_category) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }
        onSubmit(localFormData);
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <ScrollView>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        {title === "Add New Product" && (
                            <TextInput
                                style={styles.input}
                                placeholder="Product ID"
                                value={localFormData.id}
                                onChangeText={(text) => setLocalFormData(prev => ({...prev, id: text}))}
                            />
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Product Name"
                            value={localFormData.name}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, name: text}))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            keyboardType="numeric"
                            value={localFormData.price}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, price: text}))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantity"
                            keyboardType="numeric"
                            value={localFormData.quantity}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, quantity: text}))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Material (optional)"
                            value={localFormData.material}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, material: text}))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Size (optional)"
                            value={localFormData.size}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, size: text}))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Gender (optional)"
                            value={localFormData.gender}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, gender: text}))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Status (optional)"
                            keyboardType="numeric"
                            value={localFormData.status}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, status: text}))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Category ID"
                            keyboardType="numeric"
                            value={localFormData.id_category}
                            onChangeText={(text) => setLocalFormData(prev => ({...prev, id_category: text}))}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={onClose} disabled={isLoading}/>
                            <Button title={isLoading ? "Submitting..." : "Submit"} onPress={handleSubmit}
                                    disabled={isLoading}/>
                        </View>
                        {isLoading && <ActivityIndicator style={styles.loader}/>}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

// Image Upload Modal Component
const ImageUploadModal = ({
                              isVisible,
                              onClose,
                              productId,
                              onSuccess
                          }: {
    isVisible: boolean;
    onClose: () => void;
    productId: string | null;
    onSuccess: () => void;
}) => {
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [thumbnailIndex, setThumbnailIndex] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const pickImages = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You need to grant access to your photos to upload images.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImages(result.assets);
            setThumbnailIndex(0);
        }
    };

    const handleUpload = async () => {
        if (!selectedImages.length) {
            Alert.alert("Error", "Please select at least one image");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();

        selectedImages.forEach((image) => {
            const imageUri = image.uri;
            const fileName = imageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(fileName);
            const type = match ? `image/${match[1]}` : 'image';

            formData.append('files', {
                uri: imageUri,
                name: fileName,
                type,
            } as any); // Explicitly cast to `any` to avoid TypeScript errors
        });

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();
            console.log('Upload success:', result);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Upload Images</Text>

                    <ScrollView style={styles.selectedImagesContainer}>
                        {selectedImages.map((image, index) => (
                            <View key={index} style={styles.selectedImageItem}>
                                <Image
                                    source={{uri: image.uri}}
                                    style={styles.selectedImagePreview}
                                />
                                <TouchableOpacity
                                    style={[
                                        styles.thumbnailButton,
                                        index === thumbnailIndex && styles.thumbnailButtonSelected
                                    ]}
                                    onPress={() => setThumbnailIndex(index)}
                                >
                                    <Text style={[
                                        styles.thumbnailButtonText,
                                        index === thumbnailIndex && styles.thumbnailButtonTextSelected
                                    ]}>
                                        {index === thumbnailIndex ? "✓ Thumbnail" : "Set as Thumbnail"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.modalButtons}>
                        <Button title="Select Images" onPress={pickImages} disabled={isUploading}/>
                        <Button title="Upload" onPress={handleUpload}
                                disabled={isUploading || selectedImages.length === 0}/>
                        <Button title="Cancel" onPress={onClose} disabled={isUploading}/>
                    </View>

                    {isUploading && <ActivityIndicator style={styles.loader}/>}
                </View>
            </View>
        </Modal>
    );
};

// Main Product Manager Component
const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchResult, setSearchResult] = useState<Product | null>(null);
    const [searchId, setSearchId] = useState<string>("");
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isImageUploadModalVisible, setIsImageUploadModalVisible] = useState(false);
    const [selectedProductForImage, setSelectedProductForImage] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductFormData>({
        id: "",
        name: "",
        price: "",
        quantity: "",
        material: "",
        size: "",
        gender: "",
        status: "",
        id_category: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const emptyFormData: ProductFormData = {
        id: "",
        name: "",
        price: "",
        quantity: "",
        material: "",
        size: "",
        gender: "",
        status: "",
        id_category: ""
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/product/all`);
            const transformedProducts = response.data.map((item: any) => ({
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.product.quantity,
                material: item.product.material,
                size: item.product.size,
                gender: item.product.gender,
                status: item.product.status,
                id_category: item.product.idCategory,
                thumbnailUrl: item.thumbnailUrl,
                imageUrls: item.imageUrls
            }));
            setProducts(transformedProducts);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleUpdatePress = useCallback((product: Product) => {
        setSelectedProduct({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            quantity: product.quantity.toString(),
            material: product.material || "",
            size: product.size || "",
            gender: product.gender || "",
            status: product.status?.toString() || "",
            id_category: product.id_category.toString()
        });
        setIsUpdateModalVisible(true);
    }, []);

    const handleImageUpload = (product: Product) => {
        setSelectedProductForImage(product.id);
        setIsImageUploadModalVisible(true);
    };

    const handleSubmitAdd = async (formData: ProductFormData) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/product/add`, null, {
                params: {
                    id: formData.id,
                    name: formData.name,
                    price: parseInt(formData.price),
                    quantity: parseInt(formData.quantity),
                    material: formData.material,
                    size: formData.size,
                    gender: formData.gender,
                    status: formData.status ? parseInt(formData.status) : undefined,
                    id_category: parseInt(formData.id_category)
                }
            });

            Alert.alert("Success", response.data);
            setIsAddModalVisible(false);
            fetchProducts();
        } catch (err: any) {
            console.error('Add error:', err.response?.data || err);
            Alert.alert(
                "Error",
                err.response?.data || "Failed to add product. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitUpdate = async (formData: ProductFormData) => {
        setIsSubmitting(true);
        try {
            const response = await axios.put(`${API_BASE_URL}/product/update/${formData.id}`, null, {
                params: {
                    name: formData.name,
                    price: parseInt(formData.price),
                    quantity: parseInt(formData.quantity),
                    material: formData.material,
                    size: formData.size,
                    gender: formData.gender,
                    status: formData.status ? parseInt(formData.status) : undefined,
                    id_category: parseInt(formData.id_category)
                }
            });

            Alert.alert("Success", response.data);
            setIsUpdateModalVisible(false);
            fetchProducts();
        } catch (err: any) {
            console.error('Update error:', err.response?.data || err);
            Alert.alert(
                "Error",
                err.response?.data || "Failed to update product. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const searchById = async () => {
        if (!searchId) {
            Alert.alert("Error", "Please enter an ID");
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/product/${searchId}`);
            if (response.data) {
                const product = response.data.product;
                setSearchResult({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    material: product.material,
                    size: product.size,
                    gender: product.gender,
                    status: product.status,
                    id_category: product.idCategory,
                    thumbnailUrl: response.data.thumbnailUrl,
                    imageUrls: response.data.imageUrls
                });
            } else {
                setSearchResult(null);
                Alert.alert("Not Found", `No product found with ID: ${searchId}`);
            }
        } catch (err) {
            setSearchResult(null);
            Alert.alert("Error", `Failed to search for product: ${searchId}`);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <ActivityIndicator style={styles.loader}/>;
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Manager</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Product ID"
                    value={searchId}
                    onChangeText={setSearchId}
                />
                <Button title="Search" onPress={searchById}/>
            </View>

            {searchResult && (
                <View style={styles.card}>
                    {searchResult.thumbnailUrl && (
                        <Image
                            source={{uri: `${API_BASE_URL}${searchResult.thumbnailUrl}`}}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                    )}
                    <View style={styles.productInfo}>
                        <Text style={styles.name}>{searchResult.name}</Text>
                        <Text>Price: ${searchResult.price}</Text>
                        <Text>Quantity: {searchResult.quantity}</Text>
                        <Text>Category: {searchResult.id_category}</Text>
                    </View>
                </View>
            )}

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        {item.thumbnailUrl && (
                            <Image
                                source={{uri: `${API_BASE_URL}${item.thumbnailUrl}`}}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                        )}
                        <View style={styles.productInfo}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text>Price: ${item.price}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                            <Text>Category: {item.id_category}</Text>
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

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setIsAddModalVisible(true)}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>

            <ProductFormModal
                isVisible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSubmit={handleSubmitAdd}
                title="Add New Product"
                initialData={emptyFormData}
                isLoading={isSubmitting}
            />

            <ProductFormModal
                isVisible={isUpdateModalVisible}
                onClose={() => setIsUpdateModalVisible(false)}
                onSubmit={handleSubmitUpdate}
                title="Update Product"
                initialData={selectedProduct}
                isLoading={isSubmitting}
            />
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
        marginLeft: 12,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    placeholderImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#e0e0e0",
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
    }, loader: {},
    errorText: {},
    defaultImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    actionButtons: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 8,
    },
    imageButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedImagesContainer: {
        maxHeight: 300,
        marginVertical: 10,
    },
    selectedImageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    selectedImagePreview: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
    },
    thumbnailButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
    },
    thumbnailButtonSelected: {
        backgroundColor: '#007AFF',
    },
    thumbnailButtonText: {
        color: '#333',
    }, thumbnailButtonTextSelected: {},


});

export default ProductManager;