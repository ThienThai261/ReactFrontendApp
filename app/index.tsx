import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import React, {useEffect, useState} from "react";
import {TextInput} from "react-native-gesture-handler";
import Category from "./home/screen/Category";
import axios from "axios";
import ProductCart from "./home/screen/ProductCart";
import {useCart} from '@/app/(tabs)/(cart)/CartContent';
import Fontisto from "react-native-vector-icons/Fontisto";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for Category and Product
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

export default function Home() {
    const API = "http://192.168.0.107:9093";

    const [cate, setCate] = useState<CategoryType[]>([]);
    const [product, setProduct] = useState<ProductType[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch categories
    const loadCate = async () => {
        try {
            const result = await axios.get<CategoryType[]>(`${API}/cate/all`);
            setCate(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch products and transform the data
    const fetchProducts = async () => {
        try {
            const response = await axios.get<ProductType[]>(`${API}/product/all`);
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
                thumbnailUrl: item.is_thumbnail_image,
                imageUrls: item.source,
            }));
            setProduct(transformedProducts);
            setError(null);
        } catch (err: any) {
            console.error("Error fetching (products):", err);
            setError("Failed to fetch (products)");
        } finally {
            setLoading(false);
        }
    };
    const handleCartPress = () => {
        router.push("./(tabs)/(cart)/");
    };

    // Handle navigation based on login status
    const handleProfilePress = async () => {
        try {
            const userDetails = await AsyncStorage.getItem("userDetails");
            if (userDetails) {
                // User is logged in, navigate to user detail screen
                router.push("./(tabs)/(user)/userDetail");
            } else {
                // User is not logged in, navigate to login screen
                router.push("./(LoginAndRegister)/Login");
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            router.push("./(auth)/login"); // Fallback to login screen
        }
    };

    useEffect(() => {
        loadCate();
        fetchProducts();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headingText}>Match Your Style</Text>
                    <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
                        <Fontisto name="person" size={24} color="#fff"/>
                        <Text style={styles.profileButtonText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton} onPress={handleCartPress}>
                        <Fontisto name="person" size={24} color="#fff"/>
                        <Text style={styles.profileButtonText}>Cart</Text>
                    </TouchableOpacity>
                </View>

                {/* Input container */}
                <View style={styles.inputContainer}>
                    <Fontisto
                        name="search"
                        size={26}
                        color={"#C0C0C0"}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search"
                        placeholderTextColor="#C0C0C0"
                    />
                </View>

                {/* Category section */}
                <FlatList
                    data={cate}
                    renderItem={({item}) => (
                        <Category
                            item={item.name}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                />

                {/* Banner */}
                <View style={styles.banner}>
                    <Image source={require("@/assets/images/react-logo.png")}/>
                    <Image source={require("@/assets/images/react-logo.png")}/>
                    <Image source={require("@/assets/images/react-logo.png")}/>
                </View>

                {/* Product List */}
                <View style={{flexDirection: "row"}}>
                    <FlatList
                        data={product.slice(0, 20)}
                        renderItem={({item}) => <ProductCart item={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        showsHorizontalScrollIndicator={true}
                        style={styles.list}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    profileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4caf50",
        padding: 8,
        borderRadius: 8,
    },
    profileButtonText: {
        color: "#fff",
        marginLeft: 5,
        fontWeight: "bold",
    },
    list: {flex: 1},
    headingText: {
        fontSize: 28,
        color: "#000000",
        marginVertical: 20,
    },
    banner: {
        marginTop: 10,
        marginEnd: 10,
        flexDirection: "row",
        height: 100,
        backgroundColor: "#000",
    },
    inputContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        marginVertical: 20,
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
    },
    searchIcon: {
        height: 26,
        width: 26,
        marginHorizontal: 15,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        color: "#000",
    },
});
