import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function UserInfo(props) {
  const {
    userInfo: { photoURL, uid, displayName, email },
    setReloadData,
    toastRef,
    setLoadingText,
    setLoading,
  } = props;

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;
    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show("Ha cerrado la galeria sin seleccionar una foto");
      } else {
        await uploadImage(result.uri, uid);
        updatePhotoURL(uid);
      }
    }
  };

  const uploadImage = async (uri, name) => {
    setLoadingText("Actualizando avatar");
    setLoading(true);
    const image = await fetch(uri);
    const blob = await image.blob();
    const ref = firebase.storage().ref().child(`avatar/${name}`);
    return ref.put(blob);
  };

  const updatePhotoURL = async (name) => {
    try {
      const photoURL = await firebase
        .storage()
        .ref(`avatar/${name}`)
        .getDownloadURL();

      const update = {
        photoURL,
      };

      await firebase.auth().currentUser.updateProfile(update);
      setReloadData(true);
      setLoading(false);
    } catch (err) {
      toastRef.current.show("Error al obtener la nueva url");
    }
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/239/abott@adorable.png",
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text style={styles.displayName}>{email ? email : "Social login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
  },
});
