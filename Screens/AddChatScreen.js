import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useLayoutEffect, useState } from "react";
import { Input, Button } from "@rneui/base";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [inputChat, setInputChat] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);
  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, "Chats"), {
        ChatName: inputChat,
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={inputChat}
        onChangeText={(text) => setInputChat(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="weixin" type="antdesign" size={24} color={"black"} />
        }
      />
      <Button
        disabled={!inputChat}
        onPress={createChat}
        title={"Create new Chat"}
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    height: "100%",
  },
});
