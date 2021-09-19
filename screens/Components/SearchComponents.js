import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
const SearchComponent = ({ query, setQuery }) => {
  const [history, setHistory] = useState([]);
  const [flag, setFlag] = useState("0");

  const renderItemHistory = ({ item }) => {
    return (
      <View style={{}}>
        <View style={styles.itemWrapper}>
        <Text>{item}</Text>
        </View>
      </View>
    );
  };
  const updateHistory = (text) => {
    if (history.length > 2) {
      setHistory([...history.slice(1), text]);
    } else setHistory([...history, text]);
  };


  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        onPress={() => {
          setFlag("1");
        }}
      >
        <View style={styles.itemWrapperStyle}>
          <Icon
            size={24}
            name="search"
            color="black"
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.searchInputStyle}
            placeholder="Search your character"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              updateHistory(text);
              setFlag("1");
            }}
          ></TextInput>
          <Icon
            size={24}
            name="close"
            color="black"
            style={styles.iconStyle}
            onPress={() => {
              setQuery("");
              setFlag("0");
            }}
          />
        </View>
        {flag == "1" ? (
          <FlatList
            data={history}
            renderItem={renderItemHistory}
            keyExtractor={(posts) => posts.toString()}
          />
        ) : null}
      </TouchableOpacity>
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
  itemWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "black",
    paddingHorizontal: 16,
    fontSize: 19
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
});

export default SearchComponent;
