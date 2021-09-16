import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchComponent = ({ onSearchEnter }) => {
  const [term, setTerm] = useState("");

  return (
    <View style={{ borderRadius: 8, borderWidth: 2, height : 50,  marginTop: "5%", marginLeft: "5%", marginRight: "5%", }}>
      <View style={styles.searchWrapperStyle}>
        <Icon size={25} name="search" color="black" style={styles.iconStyle} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          style={styles.searchInputStyle}
          value={term}
          onChangeText={(newText) => {
            setTerm(newText);
          }}
          onEndEditing={() => {
            onSearchEnter(term);
          }}
        />

        <Icon
          size={25}
          name="close"
          color="black"
          style={styles.iconStyle}
          onPress={() => {
            setTerm("");
            onSearchEnter("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderColor: "black",
    borderRadius: 8,
  },
  iconStyle: {
    marginTop: 4,
    marginHorizontal: 8,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    color: "black",
  },
});

export default SearchComponent;
