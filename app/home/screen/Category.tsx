import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Category = ({ item, selectedCategory, setSelectedCategory, productName }) => {

  return (
      <View>
        <TouchableOpacity onPress={() => setSelectedCategory(selectedCategory === item ? null : item)
        }>
          <Text
              style={[styles.categoryText,
                selectedCategory === item && {
                  color: "#FFF",
                  backgroundColor: "#E96E6E",
                }
              ]}>{productName}
          </Text>
        </TouchableOpacity>
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