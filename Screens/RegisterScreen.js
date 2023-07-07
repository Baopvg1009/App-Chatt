import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import MarterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
          photoURL: imageUrl,
        })
          .then(() => {
            // Profile updated successfully
            console.log("Succesfully");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
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
            style={{ height: 120, width: 360 }}
          />
        </View>

        <Text
          style={{
            // fontFamily:'Roboto-Medium',
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
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
            placeholder="Username"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            value={name}
            onChangeText={(text) => {
              setName(text);
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
          <MarterialIcons
            name="email"
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
            keyboardType="email-address"
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
            placeholder="Password"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
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
            name="image"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Profile Picture URL (optional)"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            value={imageUrl}
            onChangeText={(text) => {
              setImageUrl(text);
            }}
            onSubmitEditing={register}
          ></TextInput>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "purple",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
          onPress={register}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "white",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Have acount?</Text>
          <TouchableOpacity>
            <Text
              style={{ color: "purple", fontWeight: 700 }}
              onPress={() => navigation.goBack()}
            >
              {" "}
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
