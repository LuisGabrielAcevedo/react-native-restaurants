import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from 'firebase';

export default function ChangeNameForm(props) {
  const { displayName, setIsVisible, setReloadData, toastRef } = props;
  const [newName, setNewName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateName = async() => {
      setError(null);
      if (!newName) {
          setError('El nombre del usuario no ha cambiado')
      } else {
          setLoading(true);
          const update = {
              displayName: newName
          };
          try {
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
            setReloadData(true);
            toastRef.current.show("Nombre actualizado correctamente");
            setIsVisible(false);
          }
          catch(err) {
            setError('Error al actualizar el nombre');
            setLoading(false);
          }
      }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        onChange={(e) => setNewName(e.nativeEvent.text)}
        defaultValue={displayName || ""}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => updateName()}
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
