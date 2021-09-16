import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import SearchComponent from "./Components/SearchComponent";

const COMICS = ({ navigation, route }) => {
  const [posts, setpost] = useState([]);


  function getPosts(t) {
    fetch(
      `http://gateway.marvel.com/v1/public/comics?ts=1&apikey=d4b1296148adc17e86c2d2acec324ac3&hash=c867cb4ebd84ccbde559d844ef2f5b2d`
    )
      .then((application) => application.json())
      .then((applicationjson) => {
        setpost(applicationjson.data.results);
      });
  }

  const renderPosts = ({ item }) => {
    return (
      <View style={{ flex: 1, padding: 5, borderRadius: 8 }}>
        <View style={styles.itemWrapperStyle}>
          <Text style={styles.itemTitleStyle}>{item.title}</Text>
          <Text style={styles.itemBodyStyle}>{item.description}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ScrollView style={styles.mainbackground}>

          <FlatList
            data={posts}
            renderItem={renderPosts}
            keyExtractor={(post) => post.id}
          />
 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainbackground: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemWrapperStyle: {
    borderWidth:2,
    borderRadius: 8,
    paddingVertical: 8,
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
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
});
export default COMICS;
