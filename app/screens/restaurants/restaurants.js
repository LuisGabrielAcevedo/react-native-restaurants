import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.view}>
      <Text>Restaurants Component</Text>
      {user && <AddRestaurantButton navigation={navigation} />}
    </View>
  );
}

function AddRestaurantButton(props) {
  const { navigation } = props;

  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => {
        navigation.navigate("AddRestaurant");
      }}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
