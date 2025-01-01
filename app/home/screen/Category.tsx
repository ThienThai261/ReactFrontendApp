import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'

const Category = ({ item, selectedCategory, setSelectedCategory }) => {
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  // useEffect(() => {
  //   console.log('selectedCategory:', selectedCategory);
  // }, [selectedCategory]);

  //const filteredProducts = item.filter(item => item.category === selectedCategory);

  return (
    <View>
      <TouchableOpacity onPress={() => setSelectedCategory(item)}>
        <Text
          style={[styles.categoryText,
          selectedCategory === item && {
            color: "#FFF",
            backgroundColor: "#E96E6E",
          }
          ]}>{item}</Text>
      </TouchableOpacity>
      {/* 
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View>
            <Text>Tên sản phẩm: {item.name}</Text>
          </View>
        )}>
      </FlatList> */}
    </View>
  );
}

export default Category

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#938F8F",
    backgroundColor: "#DFDCDC",
    textAlign: "center",
    borderRadius: 16,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})