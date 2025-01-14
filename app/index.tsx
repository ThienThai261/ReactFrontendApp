import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity, ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Category from "./home/screen/Category";
import axios from "axios";
import ProductCart from "./home/screen/ProductCart";
import { useCart } from '@/app/(tabs)/(cart)/CartContent';
import Fontisto from "react-native-vector-icons/Fontisto";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/ui/Header";
import { baseurl } from "./baseurl";

// Define types for Category, Product, and Banner
type CategoryType = {
    id: number;
    name: string;
};

type ProductType = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    material: string;
    size: string;
    gender: string;
    status: string;
    id_category: number;
    thumbnailUrl: string;
    imageUrls: string[];
};

type BannerType = {
    id: number;
    source: string;
};



const Index = () => {
    const API = baseurl;

    const [cate, setCate] = useState<CategoryType[]>([]);
    const [product, setProduct] = useState<ProductType[]>([]);
    // State for banners
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>("");
    const [bannerImages, setBannerImages] = useState<BannerType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

    // categories
    const loadCate = async () => {
        try {
            const result = await axios.get<CategoryType[]>(`${API}/categories`);
            setCate(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Failed to fetch categories");
        }
    };

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get<any[]>(`${API}/product/all`);
            const transformedProducts = response.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                material: item.material,
                size: item.size,
                color: item.color,
                gender: item.gender,
                status: item.status,
                id_category: item.idCategory,
                thumbnailUrl: item.thumbnailUrl,
                imageUrls: item.imageUrls || []
            }));
            setProduct(transformedProducts);
            setFilteredProducts(transformedProducts);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const fetchBanners = async () => {
        try {
            const response = await axios.get<BannerType[]>(`${API}/slider/all`);
            console.log("API Response for banners:", response.data); // Log API response

            const updatedBanners = response.data.map(banner => ({
                id: banner.id,
                source: `${API}/${banner.source.replace('./', '')}`,
            }));

            console.log("Updated Banners:", updatedBanners); // Log updated banners after processing
            setBannerImages(updatedBanners);
        } catch (err) {
            console.error("Error fetching banners:", err);
            setError("Failed to fetch banners");
        }
    };
    const handleVoucher = () => {
        router.push("../voucher/VoucherList");
    }


    // Handle navigation to profile
    const handleProfilePress = async () => {
        try {
            const userDetails = await AsyncStorage.getItem("userDetails");
            if (userDetails) {
                router.push("/(tabs)/(user)/userDetail");
            } else {
                router.push("/(LoginAndRegister)/Login");
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            router.push("./(auth)/login");
        }
    };

    useEffect(() => {
        loadCate();
        fetchProducts();
        fetchBanners();  // Call the fetchBanners function
    }, []);

    // cate and search
    useEffect(() => {
        const newFilteredProduct = product.filter(product => {
            // Logic lọc kết hợp
            const nameMatch = product.name.toLowerCase().includes(searchText.toLowerCase());
            const categoryMatch = selectedCategory === null || product.id_category === selectedCategory;

            return nameMatch && categoryMatch; // Chỉ giữ lại sản phẩm khi cả hai điều kiện đều đúng
        });
        setFilteredProducts(newFilteredProduct);
    }, [searchText, selectedCategory]);

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <TouchableOpacity

                    onPress={handleVoucher}
                >

                </TouchableOpacity>
                {/* Header Section */}
                <Header title="Match Your Style" />

                {/* Search Input */}
                <View style={styles.inputContainer}>
                    <Fontisto
                        name="search"
                        size={26}
                        color="#C0C0C0"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search"
                        placeholderTextColor="#C0C0C0"
                        onChangeText={text => setSearchText(text)}
                        value={searchText}
                    />
                </View>

                {/* Categories */}
                <View style={styles.categoryList}>
                    <FlatList
                        data={cate}
                        renderItem={({ item }) => (
                            <Category
                                item={item.id}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                productName={item.name}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.banner}>
                    <FlatList
                        data={bannerImages}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={false} // Optional: If true, it ensures snapping behavior for each screen width.
                        snapToAlignment="center" // Align snapping to the center of the screen.
                        snapToInterval={300 + 10} // Add margin (if any) to the image width.
                        decelerationRate="fast" // Speeds up the snapping effect.
                        renderItem={({ item }) => {
                            return (
                                <Image
                                    key={item.id}
                                    source={{ uri: item.source }}
                                    style={styles.bannerImage}
                                    resizeMode="cover"
                                />
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>

                {/* Products Grid */}
                {loading ? (
                    <Text style={styles.loadingText}>Loading products...</Text>
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : (
                    <View style={styles.productsContainer}>
                        <FlatList
                            data={filteredProducts}
                            renderItem={({ item }) => <ProductCart item={item} />}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.productsList}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 20,
    },
    categoryList: {
        height: 50,
    },
    banner: {
        marginTop: 10,
        marginBottom: 15,
        flexDirection: "row",
        height: 150,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        overflow: 'hidden',
    },
    bannerImage: {
        width: 300, // Must match snapToInterval
        height: 120,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    inputContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        marginVertical: 20,
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginHorizontal: 15,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        paddingRight: 15,
    },
    productsContainer: {
        flex: 1,
    },
    productsList: {
        paddingBottom: 20,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'red',
    },
});

export default Index;
