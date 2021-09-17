import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const CHARACTERS = ({ navigation, route }) => {
  const [posts, setpost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setOffset] = useState(0);

  function getPosts(currentOffset) {
    fetch(
      `http://gateway.marvel.com/v1/public/comics?&limit=20&offset=${currentOffset}&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
    )
      .then((application) => application.json())
      .then((applicationjson) => {
        setpost([...posts, ...applicationjson.data.results]);
      });
  }

  const renderPosts = ({ item }) => {
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
            <Text style={styles.itemTitleStyle}>{item.title}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    setOffset(currentOffset + 20);
  };

  useEffect(() => {
    getPosts(currentOffset);
  }, [currentPage]);

  return (
    <View style={styles.mainbackground}>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(post) => post.id.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainbackground: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemWrapperStyle: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 16,
    borderColor: "black",
    paddingHorizontal: 16,
  },
  itemTitleStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  itemBodyStyle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    justifyContent: "flex-start",
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
  itemImage: {
    width: 135,
    height: 150,
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default CHARACTERS;
