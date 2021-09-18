import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

import FilterComponent from  "./Components/FilterComponent";

const COMICS = ({ navigation, route }) => {
  const [posts, setpost] = useState([]);
  const [currentOffset, setOffset] = useState(0);
  const [currentDate, setcurrentDate] = useState("");
  const [prevWeekDate, setPrevWeekDate] = useState("");
  const [prevMonthDate, setPrevMonthDate] = useState("");
  const [nextWeekDate, setNextWeekDate] = useState("");
  const [nextMonthDate, setNextMonthDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("All Comics");
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setcurrentDate(year + "-" + month + "-" + date);
    setPrevWeekDate(year + "-" + month + "-" + (date - 7));
    setPrevMonthDate(year + "-" + (month - 1) + "-" + date);
    setNextWeekDate(year + "-" + month + "-" + (date + 7));
    setNextMonthDate(year + "-" + (month + 1) + "-" + date);
  }, []);

  useEffect(() => {
    fetchData(selectedValue, dateRange, currentOffset)
      .then((application) => application.json())
      .then((applicationjson) => {
        if (currentOffset === 0) setpost(applicationjson.data.results);
        else setpost([...posts, ...applicationjson.data.results]);
      });
    return () => {};
  }, [currentOffset, dateRange]);

  useEffect(() => {
    setOffset(0);
    let newDateRange;
    if (selectedValue === "Released Previous Week") {
      newDateRange = prevWeekDate + "%2C" + currentDate;
    }
    if (selectedValue === "Released Previous Month") {
      newDateRange = prevMonthDate + "%2C" + currentDate;
    }
    if (selectedValue === "To be release Next Month") {
      newDateRange = currentDate + "%2C" + nextMonthDate;
    }
    if (selectedValue === "To be release Next Week") {
      newDateRange = currentDate + "%2C" + nextWeekDate;
    }
    setDateRange(newDateRange);
    // if (!newDateRange) {
    //   return;
    // }
    // fetchData(selectedValue, newDateRange, 0)
    //   .then((application) => application.json())
    //   .then((applicationjson) => {
    //     setpost(applicationjson.data.results);
    //   });
    return () => {
      setpost([]);
    };
  }, [selectedValue]);

  const fetchData = (query, dateRange, offset = 0) => {
    if (query === "All Comics" || !dateRange) {
      return getPosts(offset);
    }

    return getFilter(dateRange, offset);
  };

  function getPosts(currentOffset) {
    return fetch(
      `http://gateway.marvel.com/v1/public/comics?&limit=20&offset=${currentOffset}&orderBy=title&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
    );
  }
  const getFilter = (date, currentOffset) => {
    return fetch(
      `http://gateway.marvel.com/v1/public/comics?&dateRange=${date}&limit=20&offset=${currentOffset}&orderBy=title&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
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
            <Text style={styles.itemTitleStyle}>{item.title}</Text>
          </View>
        </View>
      </View>
    );
  };

  const onComicsChange = (itemValue) => {
    setSelectedValue(itemValue);
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

  useEffect(() => {
    getPosts(currentOffset);
  }, [currentOffset]);

  return (
    <View style={styles.mainbackground}>
      <FilterComponent
        setSelectedValue = {setSelectedValue} selectedValue = {selectedValue}
      />
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(posts) => posts.name}
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
  not: {
    width: "100%",
    marginTop: 1,
    marginBottom: 1,
    borderWidth: 0.01,
    shadowColor: "black",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 11,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
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

export default COMICS;
