import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MarterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
      console.log(user);
    });
    return unsub;
  }, []); // Sign In after Sign up sucessfully
  const singIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        paddingLeft: 25,
        paddingRight: 25,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/login.png")}
            style={{ height: 120, width: 360, alignItems: "center" }}
          />
        </View>

        <Text
          style={{
            // fontFamily:'Roboto-Medium',
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
            paddingLeft: 5,
          }}
        >
          Login
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <MarterialIcons
            name="person-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            keyboardType="default"
          ></TextInput>
        </View>

        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            value={password}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
            onSubmitEditing={singIn}
          ></TextInput>

          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{ color: "purple", fontWeight: "700", paddingRight: 10 }}
            >
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "purple",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
          onPress={singIn}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "white",
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>No have acount?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "purple", fontWeight: 700 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
