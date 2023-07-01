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
const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);
  const createChat = async () => {};
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="weixin" type="antdesign" size={24} color={"black"} />
        }
      />
      <Button onPress={createChat} title={"Create new Chat"} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({ container: {} });
