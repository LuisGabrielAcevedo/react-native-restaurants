import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { reAuthenticate } from "src/app/utils/api";
import * as firebase from "firebase";

export default function ChangePasswordForm(props) {
  const { setIsVisible, toastRef } = props;
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newRepeatPassword, setNewRepeatPassword] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideNewRepeatPassword, setHideNewRepeatPassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updatePassword = async () => {
    setErrors({});
    if (!password || !newPassword || !newRepeatPassword) {
      let errosObj = {};
      !password && (errosObj.password = "No puede estar vacío");
      !newPassword && (errosObj.newPassword = "No puede estar vacío");
      !newRepeatPassword &&
        (errosObj.newRepeatPassword = "No puede estar vacío");
      setErrors(errosObj);
    } else {
      if (newPassword !== newRepeatPassword) {
        setErrors({
          newPassword: "Las nuevas contraseñas deben ser iguales",
          newRepeatPassword: "Las nuevas contraseñas deben ser iguales",
        });
      } else {
        setLoading(true);
        try {
          await reAuthenticate(password);
          await firebase.auth().currentUser.updatePassword(newPassword);
          setLoading(false);
          toastRef.current.show("Contraseña actualizada correctamente");
          setIsVisible(false);
          await firebase.auth().signOut();
        } catch (err) {
          console.log(err);
          setErrors({
            general: "Error actualizando contraseña",
          });
          setLoading(false);
        }
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Constraseña actual"
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
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        secureTextEntry={hideNewPassword}
        password={true}
        rightIcon={{
          type: "material-community",
          name: hideNewPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPassword(!hideNewPassword),
        }}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Confirmar contraseña"
        containerStyle={styles.input}
        onChange={(e) => setNewRepeatPassword(e.nativeEvent.text)}
        secureTextEntry={hideNewRepeatPassword}
        password={true}
        rightIcon={{
          type: "material-community",
          name: hideNewRepeatPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewRepeatPassword(!hideNewRepeatPassword),
        }}
        errorMessage={errors.newRepeatPassword}
      />

      <Button
        title="Cambiar contraseña"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => updatePassword()}
        loading={loading}
      />
      <Text style={styles.error}>{errors.general}</Text>
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
  error: {
    color: "red",
  },
});
