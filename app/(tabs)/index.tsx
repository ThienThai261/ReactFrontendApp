import {Text, View, StyleSheet, TextInput, ScrollView,TouchableOpacity, Image, Dimensions} from "react-native";
import React from "react";
import {Link, router} from "expo-router";
import Swiper from 'react-native-swiper';
import ButtonNew from "@/components/ui/ButtonNew";
import HamburgerButton from "@/components/ui/HamburgerButton";

export default function Index() {
    const handlePress = () => {
        alert("Button Pressed!");
    };
    const handleMenuPress = () => {
        // This will open the drawer
        router.push("//(tabs)ProductManager");
    };
    const bannerImages =[
      { uri: 'https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg' },
      { uri: 'https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg' },
      { uri: 'https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg' },
    ];


    return(
        <ScrollView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Home</Text>
            <View style={styles.icons}>
          <TouchableOpacity>
            <Image source={{ uri: 'https://webstockreview.net/images/notification-icon-png.png' }} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={{ uri: 'https://th.bing.com/th/id/OIP.iDVurdWMV4YcAhqCEaT1bQHaHa?rs=1&pid=ImgDetMain' }} style={styles.icon} />
          </TouchableOpacity>
        </View>
          </View>

            /**searchBar */
        <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search anything..."
          placeholderTextColor="#aaa"
        />
        
        </View>
        
      /**banner */
      <View style={styles.bannerSlider}>
        <Swiper
          autoplay
          autoplayTimeout={4}
          showsPagination
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          {bannerImages.map((image, index) => (
            <View key={index} style={styles.banner}>
              <Image source={image} style={styles.bannerImage} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.categoriesContainer}>
  <View style={styles.categoriesHeader}>
    <Text style={styles.categoriesTitle}>Category</Text>
    <TouchableOpacity>
      <Text style={styles.seeAllText}>See All</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.categoriesList}>
    {[
      { name: 'T-Shirt', icon: { uri: 'https://th.bing.com/th/id/R.8f9243002ceb3b4682718ab1f3eaa870?rik=GRsVfZr8Dn0V%2bQ&pid=ImgRaw&r=0' }},
      { name: 'Pant', icon: { uri: 'https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-pants-line-icon-vector-png-image_6693260.png' }},
      { name: 'Dress', icon: { uri: 'https://th.bing.com/th/id/OIP.R5q-ZR3eQtlbdUSBk3o1LQHaLb?rs=1&pid=ImgDetMain' } },
      { name: 'Jacket', icon: { uri: 'https://static.vecteezy.com/system/resources/previews/007/126/416/original/jacket-icon-vector.jpg' } },
      ].map((category, index) => (
      <TouchableOpacity key={index} style={styles.categoryItem}>
        <View style={styles.categoryIconContainer}>
          <Image source={category.icon} style={styles.categoryIcon} />
        </View>
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
      ))}
      </View>
    </View>


    <View style={styles.productContainer}>
  {/* Thanh bộ lọc */}
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
    {['All', 'Newest', 'Popular', 'Man', 'Woman'].map((filter, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.filterButton, filter === 'Newest' && styles.activeFilterButton]}
      >
        <Text
          style={[styles.filterText, filter === 'Newest' && styles.activeFilterText]}
        >
          {filter}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>

  <View style={styles.productGrid}>
    {[
      { name: 'Áo khoác cổ vest', price: '707.000đ', rating: 4.9, image: { uri: 'https://media.routine.vn/1200x1500/prod/media/10F22JACW012_-BLACK_1_ao-khoac-nu-1-zzap.jpg' } },
      { name: 'Áo blazer knit dệt', price: '1.326.000đ', rating: 5.0, image: { uri: 'https://media.routine.vn/1200x1500/prod/media/10F23VES010R1_WIND-CHIME_ao-vest-nam-1-xarr.jpg' } },
      { name: 'Áo khoác jean nam', price: '687.000đ', rating: 4.9, image: { uri: 'https://media.routine.vn/1200x1500/prod/product/10f23dja004-black-ao-khoac-jean-nam-1-jpg-lfyp.webp' } },
      { name: 'YÁo thun nam tay ngắn', price: '540.000đ', rating: 5.0, image: { uri: 'https://media.routine.vn/1200x1500/prod/media/10f24tss079-senaca-rock-ao-thun-nam-1-jpg-4ksd.webp' } },
    ].map((product, index) => (
      <View key={index} style={styles.productCard}>
        <Image source={product.image} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <View style={styles.productRating}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png' }}
            style={styles.starIcon}
          />
          <Text style={styles.productRatingText}>{product.rating}</Text>
        </View>
      </View>
    ))}
  </View>
  </View>
    </ScrollView>
        
      
      
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    titleContainer: {
      position: 'relative',
      justifyContent: 'center',
      flexDirection: 'row', // Căn các thành phần theo chiều ngang
      alignItems: 'center', // Căn giữa theo chiều dọc
      paddingHorizontal: 10,
      paddingVertical: 10,

    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      fontStyle: 'normal',
      alignItems: 'center'
    },
    
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',

    },
    header: {
        position: 'absolute',
        top: 40, // Adjust this value based on your needs
        left: 20,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        elevation: 2,

    },
    linkContainer: {
        alignItems: "center",
        gap: 10,
    },
    link: {
        color: "blue",
        fontSize: 16,
        marginVertical: 8,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        marginRight: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      icons: {
        flexDirection: 'row', // Đặt các icon theo chiều ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
        position:'absolute',
        right: 10,
      },
      icon: {
        width: 24,
        height: 24,
        marginLeft: 15, // Tạo khoảng cách giữa các icon
      },
      categories: {
        flexDirection: 'row',
        marginVertical: 10,
      },
      category: {
        alignItems: 'center',
        marginHorizontal: 10,
      },
      categoryImage: {
        width: 40,
        height: 40,
      },
      categoryText: {
        marginTop: 5,
        fontSize: 12,
      },
      bannerSlider: {
        paddingTop: 50,
        height: 250,
        zIndex:1
      },
      banner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bannerImage: {
        width: width * 0.9,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
      },
      dot: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
      },
      activeDot: {
        backgroundColor: '#ff5e5e',
        width: 8,
        height: 8,
        borderRadius: 4,
      },
      categoriesContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
      },
      categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      categoriesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      seeAllText: {
        fontSize: 14,
        color: '#007BFF',
      },
      categoriesList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      categoryItem: {
        alignItems: 'center',
        width: 70, // Adjust this based on your layout
      },
      categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
      },
      categoryIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      productContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
      },
      filterBar: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      filterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginRight: 10,
      },
      activeFilterButton: {
        backgroundColor: '#b388ff',
      },
      filterText: {
        fontSize: 14,
        color: '#555',
      },
      activeFilterText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',
      },
      productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        marginBottom: 10,
      },
      productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      productPrice: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
      },
      productRating: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      starIcon: {
        width: 16,
        height: 16,
        marginRight: 5,
      },
      productRatingText: {
        fontSize: 12,
        color: '#555',
      },
      
});
