import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { validateEmail } from "src/app/utils/validators";
import * as firebase from "firebase";
import Loading from "src/app/components/loading";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const register = async () => {
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("Las contraseñas no son iguales");
        } else {
          try {
            setIsVisible(true);
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
            navigation.navigate("MyAccount");
          } catch (err) {
            toastRef.current.show("Error al crear la cuenta");
          }
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
        value={email}
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
        value={password}
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
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.input}
        password={true}
        value={repeatPassword}
        secureTextEntry={hideRepeatPassword} //Contraseña con puntos
        onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            size={22}
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => register()}
      />
      <Loading isVisible={isVisible} text="Creando cuenta" />
    </View>
  );
}

export default RegisterForm;

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
