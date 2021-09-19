import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const SearchComponent = ({ query, setQuery, }) => {
 
  
useEffect(()=>{

})
  
  return (
    <View style={{ padding: 20 }}>
      <View style={styles.itemWrapperStyle}>
        <Icon size={24} name="search" color="black" style={styles.iconStyle} />
        <TextInput
          style={styles.searchInputStyle}
          placeholder="Search your character"
          value={query}
          onChangeText={(text) => {
            console.log(text),
            setQuery(text);

          }}
        ></TextInput>
        <Icon
          size={24}
          name="close"
          color="black"
          style={styles.iconStyle}
          onPress={() => {
            setQuery("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainbackground: {
    flex: 1,
    backgroundColor: "#800000",
  },
  itemWrapperStyle: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 16,
    borderColor: "black",
    paddingHorizontal: 16,
  },

  searchInputStyle: {
    flex: 1,
    margin: 0,
    fontSize: 20,
    color: "black",
  },
  iconStyle: {
    marginTop: "0.5%",
    marginHorizontal: "2%",
  },
  itemBodyStyle: {
    fontSize: 14,
    color: "#555",
    marginTop: "3%",
    justifyContent: "flex-start",
  },
});

export default SearchComponent;
