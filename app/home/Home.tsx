import { Text, View, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Category from "./screen/Category";
import axios from 'axios';
import ProductCart from "./screen/ProductCart";
import Fontisto from "react-native-vector-icons/Fontisto"

export default function Home() {
    const API = "http://192.168.1.141:8080"

    const [cate, setCate] = useState([])
    const [product, setProduct] = useState([]);

    const loadCate = async () => {
        const result = await axios.get(`${API}/cate/all`);
        setCate(result.data);
    };

    const loadProduct = async () => {
        const result = await axios.get(`${API}/product/all`);
        setProduct(result.data);
    };

    const [selectedCategory, setSelectedCategory] = useState(null)

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API}/product/all`);
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
                imageUrls: item.source
            }));
            setProduct(transformedProducts);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching (products):', err);
            setError('Failed to fetch (products)');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCate();
        loadProduct();
        //fetchProducts();
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Input container */}
                <Text style={styles.headingText}>Match Your Style</Text>

                <View style={styles.inputContainer}>
                    <Fontisto name="search" size={26} color={"#C0C0C0"} style={styles.searchIcon}></Fontisto>
                    <TextInput style={styles.textInput} placeholder="Search"></TextInput>
                </View>

                {/* Category section*/}
                <FlatList
                    data={cate}
                    renderItem={({ item }) => (
                        <Category
                            item={item.name}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory} />
                    )}
                    keyExtractor={(item) => item}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true} >
                </FlatList>

                {/* Banner */}
                <View style={styles.banner}>
                    <Image source={require("@/assets/images/react-logo.png")}></Image>
                    <Image source={require("@/assets/images/react-logo.png")}></Image>
                    <Image source={require("@/assets/images/react-logo.png")}></Image>
                </View>

                {/* Product List */}
                <View style={{ flexDirection: "row", }} >
                    <FlatList
                        data={product.slice(0, 20)}
                        renderItem={({ item }) => (
                            <ProductCart
                                item={item} />
                        )}
                        keyExtractor={(item) => item.id.toString}
                        numColumns={2}
                        showsHorizontalScrollIndicator={true}
                        style={styles.list}>
                    </FlatList>
                </View>
            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    list: { flex: 1 },
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
        backgroundColor: "#000"
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
        //borderWidth: 1,
        //borderColor: "black",
        fontSize: 18,
        //fontFamily: "Poppins-Regular",
        color: "#C0C0C0"
    },
});