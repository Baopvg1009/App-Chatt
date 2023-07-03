import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/base";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      //   headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL,
            }}
          />
          <Text style={{ color: "black", marginLeft: 10, fontWeight: "700" }}>
            {route.params.ChatName}
          </Text>
        </View>
      ),
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      //   headerLeft: () => {
      //     <TouchableOpacity style>
      //       <AntDesign name="arrowleft" size={24} color="black" />
      //     </TouchableOpacity>;
      //   },
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 50,
            marginRight: 5,
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 15, justifyContent: "space-between" }}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <Ionicons name="call" size={22} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camera" size={24} color={"black"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);
  const sendMessage = () => {
    Keyboard.dismiss();
    const existingDocRef = doc(db, "Chats", route.params.id); //lấy coll and doc id hiện  tại
    addDoc(collection(existingDocRef, "Message"), {
      // thêm mới collection vào doc id đã lấy ở trên
      // data for the new document in the new collection
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
    console.log(existingDocRef);
  };

  useLayoutEffect(() => {
    // Đăng ký lắng nghe dữ liệu trên collection "message" của document với ID là route.params.id trong collection "Chats"
    const unsubscribe = onSnapshot(
      query(
        collection(doc(db, "Chats", route.params.id), "Message"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );

    return () => {
      unsubscribe(); // Hủy đăng ký lắng nghe dữ liệu khi component bị unmount
    };
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      rounded
                      position="absolute"
                      //Web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        // left: -5,
                      }}
                      size={30}
                      bottom={-13}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      //Web
                      position="absolute"
                      containerStyle={{
                        position: "absolute",
                        bottom: -5,
                        left: -5,
                      }}
                      size={30}
                      bottom={-13}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="Message"
                style={styles.textInput}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
          {/* <Text>{route.params.ChatName}</Text> */}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#CECECE",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 35,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    // borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
