import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "src/app/components/account/register-form";
import Toast from "react-native-easy-toast";

function Register(props) {
  const toastRef = useRef();
  const { navigation } = props;

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("src/assets/images/login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} navigation={navigation} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </KeyboardAwareScrollView>
  );
}

export default withNavigation(Register);

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
