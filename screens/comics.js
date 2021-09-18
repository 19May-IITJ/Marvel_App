import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Picker,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const COMICS = ({ navigation, route }) => {
  const [posts, setpost] = useState([]);
  const [currentOffset, setOffset] = useState(0);
  const [currentDate, setcurrentDate] = useState(" ");
  const [prevWeekDate, setPrevWeekDate] = useState(" ");
  const [prevMonthDate, setPrevMonthDate] = useState(" ");
  const [nextWeekDate, setNextWeekDate] = useState(" ");
  const [nextMonthDate, setNextMonthDate] = useState(" ");
  const [selectedValue, setSelectedValue] = useState("All Comics");
  const [dateRange, setDateRange] = useState('');

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
    fetchData(selectedValue, dateRange,currentOffset)
      .then((application) => application.json())
      .then((applicationjson) => {
        console.log(applicationjson)
        setpost([...posts, ...applicationjson.data.results]);
      });
    return () => {
      
    };
  }, [currentOffset]);

  useEffect(() => {
    setOffset(0);

    fetchData(selectedValue, dateRange,0)
      .then((application) => application.json())
      .then((applicationjson) => {
        setpost(applicationjson.data.results);
      });
    return () => {
      setpost([]);
    };
  }, [selectedValue]);

  const fetchData = (query, dateRange ,offset = 0) => {
    if (query === "All Comics") 
    {
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
      `http://gateway.marvel.com/v1/public/comics?&dateRange=${date}&limit=20&offset=${currentOffset}&ts=1&apikey=e6d7a8caec633eb27579df5ba8a19a60&hash=ced257dc0da28bc88cbc9e58d441057b`
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
    if (itemValue === "All Comics") 
      getPosts(currentOffset);
    if (itemValue === "Released Previous Week")
    {  setDateRange(prevWeekDate + "%2C" + currentDate),
      getFilter( dateRange, currentOffset);
   }
   if (itemValue === "Released Previous Month")

     { setDateRange(prevMonthDate + "%2C" + currentDate),
       getFilter( dateRange, currentOffset);}
    if (itemValue === "To be release Next Month")
    { setDateRange(currentDate + "%2C" + nextMonthDate)
      getFilter( dateRange, currentOffset);
    }
    if (itemValue === "To be release Next Week")
    {  setDateRange(currentDate + "%2C" + nextWeekDate)
      getFilter( dateRange, currentOffset);
    }
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
      <View style={{ padding: 20 }}>
        <View style={styles.not}>
          <FontAwesome5 name="filter" size={30} color={"black"}></FontAwesome5>
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              marginTop: "01%",
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: "1%",
            }}
          >
            Filters
          </Text>
          {
            <Picker
              selectedValue={selectedValue}
              style={{ height: 30, borderRadius: 5, width: "75%" }}
              onValueChange={(itemValue) =>
                onComicsChange(itemValue)
              }
            >
              <Picker.Item label="All Comics" value="All Comics"></Picker.Item>
              <Picker.Item
                label="Released Previous Week"
                value="Released Previous Week"
              ></Picker.Item>
              <Picker.Item
                label="Released Previous Month"
                value="Released in Previous Month"
              ></Picker.Item>
              <Picker.Item
                label="To be release Next Week"
                value="To be release Next Week"
              ></Picker.Item>
              <Picker.Item
                label="To be release Next Month"
                value="To be release Next Month"
              ></Picker.Item>
            </Picker>
          }
        </View>
      </View>
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
