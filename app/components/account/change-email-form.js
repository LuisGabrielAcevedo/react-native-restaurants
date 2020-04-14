import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { reAuthenticate } from "src/app/utils/api";
import * as firebase from "firebase";

export default function ChangeEmailForm(props) {
  const { email, setIsVisible, setReloadData, toastRef } = props;
  const [newEmail, setNewEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateEmail = async () => {
    setErrors({});
    if (!newEmail || newEmail === email) {
      setErrors({
        email: "El email no puede ser igual o no existe",
      });
    } else {
      setLoading(true);
      try {
        await reAuthenticate(password);
        await firebase.auth().currentUser.updateEmail(newEmail);
        setLoading(false);
        setReloadData(true);
        toastRef.current.show("Email actualizado correctamente");
        setIsVisible(false);
      } catch (err) {
        setErrors({
          password: "La contraseña no es correcta",
        });
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        defaultValue={email || ""}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        secureTextEntry={hidePassword}
        password={true}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword),
        }}
        errorMessage={errors.password}
      />
      <Button
        title="Cambiar email"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => updateEmail()}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
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
