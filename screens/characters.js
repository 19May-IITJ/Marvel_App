import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";

import SearchComponent from "./Components/SearchComponents";

const CHARACTERS = ({ navigation, route }) => {
  const [posts, setpost] = useState([]);
  const [currentOffset, setOffset] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData(query, currentOffset)
      .then((application) => application.json())
      .then((applicationjson) => {
        setpost([...posts, ...applicationjson.data.results]);
      });
    return () => {};
  }, [currentOffset]);

  useEffect(() => {
    setOffset(0);
    fetchData(query, 0)
      .then((application) => application.json())
      .then((applicationjson) => {
        setpost(applicationjson.data.results);
      });
    return () => {
      setpost([]);
    };
  }, [query]);

  const fetchData = (query, offset = 0) => {
    if (query === "") return getPosts(offset);
    return getQuery(query, offset);
  };

  const getPosts = (currentOffset) => {
    return fetch(
      `http://gateway.marvel.com/v1/public/characters?&limit=20&offset=${currentOffset}&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
    );
  };
  const getQuery = (query, currentOffset) => {
    //   if(query)
    // const removeExtraSpace = (s) => s.trim().split(/ +/).join('%20');
    return fetch(
      `http://gateway.marvel.com/v1/public/characters?&nameStartsWith=${query}&limit=20&offset=${currentOffset}&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
    );
  };

  let renderPosts = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={styles.itemWrapperStyle}>
          <Image
            style={styles.itemImage}
            source={{
              uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            }}
          />
          <View style={{ flex: 1, flexDirection: "column", marginLeft: "5%" }}>
            <Text style={styles.itemTitleStyle}>{item.name}</Text>
            <Text style={(styles.itemBodyStyle, {})}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };
  const loadMoreItem = () => {
    setOffset(currentOffset + 20);
  };

  return (
    <View style={styles.mainbackground}>
      <SearchComponent query={query} setQuery={setQuery} />

      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(posts) => posts.name.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
      />
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
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 16,
    borderColor: "#000",
    paddingHorizontal: 16,
  },
  itemTitleStyle: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#fff",
  },

  itemImage: {
    width: 135,
    height: 150,
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
  searchInputStyle: {
    flex: 1,
    margin: 0,
    fontSize: 25,
    color: "#000",
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

export default CHARACTERS;
