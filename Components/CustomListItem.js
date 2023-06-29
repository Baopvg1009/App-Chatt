import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar
        rounded //làm tròn góc UI
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        }}
      />
      <ListItemContent>
        <ListItem.Title style={{ fontWeight: "800" }}>
          Youtube Chat
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1} // số dòng tối đa
          ellipsizeMode="tail"
        >
          This is test Subtitle This is test Subtitle This is test Subtitle This
          is test Subtitle This is test Subtitle This is test Subtitle This is
          test Subtitle
        </ListItem.Subtitle>
      </ListItemContent>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
