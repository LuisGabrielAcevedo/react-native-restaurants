import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { withNavigation } from "react-navigation";
import LoginForm from "src/app/components/account/login-form";
import Toast from "react-native-easy-toast";
import LoginFacebook from "src/app/components/account/login-facebook";

function Login(props) {
  const toastRef = useRef();
  const { navigation } = props;

  return (
    <ScrollView>
      <Image
        source={require("src/assets/images/login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.view}>
        <LoginForm toastRef={toastRef} navigation={navigation} />
        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.view}>
        <LoginFacebook />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </ScrollView>
  );
}

function CreateAccount(props) {
  const { navigation } = props;

  return (
    <View style={styles.viewRegister}>
      <Text style={styles.textRegister}>¿Aún no tienes una cuenta?</Text>
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        Registrate
      </Text>
    </View>
  );
}

export default withNavigation(Login);

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  view: {
    marginRight: 40,
    marginLeft: 40,
  },
  viewRegister: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  textRegister: {
    marginRight: 10,
  },
  btnRegister: {
    fontWeight: "bold",
    color: "#00a680",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
    marginBottom: 20,
  },
});
