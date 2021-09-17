import { replace } from "lodash";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CHARACTERS = ({ navigation, route }) => {
  const [posts, setpost] = useState([]);
  const [currentOffset, setOffset] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchData(q, currentOffset)
      .then((application) => application.json())
      .then((applicationjson) => {
        console.log(applicationjson.data.results);
        setpost([...posts, ...applicationjson.data.results]);
      });
    return () => {
      //   setQ({});
    };
  }, [currentOffset]);

  useEffect(() => {
    setOffset(0);

    fetchData(q, 0)
      .then((application) => application.json())
      .then((applicationjson) => {
        console.log(applicationjson.data.results);
        setpost(applicationjson.data.results);
      });
  }, [q]);

  const fetchData = (query, offset = 0) => {
    if (query === "") return getPosts(offset);
    return getQuery(query, offset);
  };

  const getPosts = (currentOffset) => {
    return fetch(
      `http://gateway.marvel.com/v1/public/characters?&limit=20&offset=${currentOffset}&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
    );
  };
  const getQuery = (q, currentOffset) => {
    return fetch(
      `http://gateway.marvel.com/v1/public/characters?&nameStartsWith=${q}&limit=20&offset=${currentOffset}&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
    );
  };

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
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  };
  const loadMoreItem = () => {
    setOffset(currentOffset + 20);
  };

  function search(data) {
    return data.filter((data) => data.name.indexOf(q) > -1);
  }

  return (
    <View style={styles.mainbackground}>
      <Icon size={18} name="search" color="white" style={styles.iconStyle} />
      <TextInput
        style={styles.itemWrapperStyle}
        placeholder="Search your character"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
        }}
      ></TextInput>

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
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
    color: "black",
  },
  iconStyle: {
    marginTop: 12,
    marginHorizontal: 8,
  },
});

export default CHARACTERS;
