import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { db } from "../firebase";
import {
  collection,
  doc,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
const CustomListItem = ({ id, ChatName, enterChat }) => {
  const [chatMessages1, setChatMessages1] = useState([]);

  useEffect(() => {
    const unsubscribe1 = onSnapshot(
      query(
        collection(doc(db, "Chats", id), "Message"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setChatMessages1(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      }
    );

    return unsubscribe1; // Hủy đăng ký lắng nghe dữ liệu khi component bị unmount
  });

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, ChatName)}>
      <Avatar
        rounded //làm tròn góc UI
        source={{
          uri:
            chatMessages1?.[0]?.data?.photoURL ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        }}
      />
      <ListItemContent>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {ChatName}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1} // số dòng tối đa
          ellipsizeMode="tail"
        >
          {chatMessages1?.[0]?.data?.displayName} :{" "}
          {chatMessages1?.[0]?.data?.message}
        </ListItem.Subtitle>
      </ListItemContent>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
