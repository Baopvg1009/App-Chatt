import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen.js";
import RegisterScreen from "./Screens/RegisterScreen.js";
import HomeScreen from "./Screens/HomeScreen.js";
import AddChatScreen from "./Screens/AddChatScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      //  initialRouteName="Home"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Let Sign Up" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        ></Stack.Screen>
        <Stack.Screen
          name="AddChat"
          component={AddChatScreen}
          options={{ title: "Add-Chat" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
