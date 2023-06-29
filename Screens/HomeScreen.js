import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomListItem from "../Components/CustomListItem";
import { Avatar } from "@rneui/base";
import { getAuth } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerRight: () => {
        <View style={{ marginLeft: 20, color: "black" }}>
          <Avatar
            rounded
            source={{
              // uri: auth?.currentUser.photoURL
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }}
          />
        </View>;
      },
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
