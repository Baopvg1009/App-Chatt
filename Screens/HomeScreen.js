import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomListItem from "../Components/CustomListItem";
import { Avatar } from "@rneui/base";
import { getAuth, signOut } from "firebase/auth";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";

import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();

  const [chats, setChats] = useState([]); //

  const signOutUser = async () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const dbRef = collection(db, "Chats");
    const unsub = onSnapshot(dbRef, (docsSnap) => {
      const chats = docsSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setChats(chats);
      console.log(chats); //OK
    });
    return unsub;
  }, []); //Get all Document

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 25, marginLeft: 10 }}>Signal</Text>
        </View>
      ),
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",

      headerLeft: () => (
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
          <Avatar
            rounded
            source={{ uri: auth?.currentUser?.photoURL }}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 50,
            marginRight: 5,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 15 }}>
            <AntDesign name="camera" size={24} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={22} color={"black"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, ChatName) => {
    navigation.navigate("Chat", { id, ChatName });
    console.log(id, ChatName);
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { ChatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            ChatName={ChatName}
            enterChat={enterChat}
          ></CustomListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
