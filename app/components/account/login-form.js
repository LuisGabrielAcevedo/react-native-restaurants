import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import Loading from "src/app/components/loading";
import * as firebase from "firebase";
import { validateEmail } from "src/app/utils/validators";

function LoginForm(props) {
  const { toastRef, navigation } = props;
  const [email, setEmail] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const login = async () => {
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        try {
          setIsVisible(true);
          await firebase.auth().signInWithEmailAndPassword(email, password);
          navigation.navigate("MyAccount");
        } catch (err) {
          toastRef.current.show("Credenciales incorrectas");
        }
      }
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            size={22}
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword} //Contraseña con puntos
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            size={22}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => login()}
      />
      <Loading isVisible={isVisible} text="Creando cuenta" />
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainer: {
    width: "95%",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
