import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";
import characters from "./screens/characters";
import comics from "./screens/comics";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#800000",
        }}
      >
        <Tab.Screen
          name={" Marvel Characters"}
          component={characters}
          options={{
            headerStyle: { backgroundColor: "#800000" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  alignItems: "center",
                  top: 1,
                  height: "10%",
                  color: "#800000",
                }}
              >
                <FontAwesome5
                  name="users"
                  size={30}
                  color={focused ? "#800000" : `#d3d3d3`}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              let wnwidth = Dimensions.get("window").width / 4;
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
        <Tab.Screen
          name={"Marvel Comics"}
          component={comics}
          options={{
            headerStyle: { backgroundColor: "#800000" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  alignItems: "center",
                  color: "#800000",
                  top: 1,
                }}
              >
                <FontAwesome5
                  name="book"
                  size={30}
                  color={focused ? "#800000" : `#d3d3d3`}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              let wnwidth = Dimensions.get("window").width / 4;
              Animated.spring(tabOffsetValue, {
                toValue: wnwidth * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() * 4,
          height: "0.5%",
          backgroundColor: "#800000",
          position: "absolute",
          bottom: "6%",
          left: getWidth() * 8.85,
          borderradius: "50%",
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      {
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#800000" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitleAlign: "center",
              title: "Marvel App",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 28,
              },
            }}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 35;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
