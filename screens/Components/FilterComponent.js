import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Picker,
  } from "react-native";
  import { FontAwesome5 } from '@expo/vector-icons'

function Button ({setSelectedValue, selectedValue}) {

    const onComicsChange = (itemValue) => {
        setSelectedValue(itemValue);
      };
    return(
        <View style={{ padding: 20 }}>
        <View style={styles.not}>
          <FontAwesome5 name="filter" size={30} color={"black"}></FontAwesome5>
          <Text
            style={{
              flex: 2,
              textAlign: "center",
              marginTop: "0.5%",
              fontSize: 19,
              fontWeight: "bold",
            }}
          >
            Filters
          </Text>
          {
            <Picker
              selectedValue={selectedValue}
              style={{ height: 30, borderRadius: 5, width: "71%" }}
              onValueChange={(itemValue) => onComicsChange(itemValue)}
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

    )
}

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

export default Button;