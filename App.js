import React from "react";
// import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./screens/HomePage";
import MainPage from "./screens/MainPage";
import CodePage from "./screens/CodePage";
import ItemPage from "./screens/ItemPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer options={{ headerShown: false }}>
        <Stack.Navigator options={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Code"
            component={CodePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Item"
            component={ItemPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
