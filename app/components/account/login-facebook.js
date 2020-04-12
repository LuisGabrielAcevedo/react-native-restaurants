import React from "react";
import { StyleSheet, View } from "react-native";
import { SocialIcon } from "react-native-elements";

export default function LoginFacebook() {
  const login = () => {
    console.log("face");
  };

  return (
    <SocialIcon
      title="Iniciar sesión con facebook"
      button
      type="facebook"
      onPress={() => login()}
    />
  );
}
