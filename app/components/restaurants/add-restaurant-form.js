import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const widthSreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { navigation, toastRef, setLoading } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  return (
    <ScrollView>
      <ImageRestaurant image={imagesSelected[0]} />
      <Form
        setName={setName}
        setAddress={setAddress}
        setDescription={setDescription}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageRestaurant(props) {
  const { image } = props;
  return (
    <View style={styles.viewPhoto}>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.mainPhoto}
        />
      ) : (
        <Image
          source={require("src/assets/images/default.png")}
          style={styles.mainPhoto}
        />
      )}
    </View>
  );
}

function UploadImage(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imageSelect = async () => {
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
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    const arrayImages = imagesSelected;
    Alert.alert(
      "Eliminar image",
      "¿Estas seguro de que deseas eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(arrayImages.filter((i) => i !== image)),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <View style={styles.viewImage}>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.icon}
          onPress={() => imageSelect()}
        />
      )}
      {imagesSelected.map((image, i) => (
        <Avatar
          key={i}
          style={styles.miniature}
          source={{
            uri: image,
          }}
          onPress={() => removeImage(image)}
        />
      ))}
    </View>
  );
}

function Form(props) {
  const { setName, setAddress, setDescription } = props;
  return (
    <View style={styles.form}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        onChange={(e) => setName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={(e) => setAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          size: 22,
          name: "google-maps",
          color: "#c2c2c2",
          onPress: () => console.log("Select"),
        }}
      />
      <Input
        placeholder="Descripción"
        inputContainerStyle={styles.textarea}
        multiline={true}
        onChange={(e) => setDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {},
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniature: {
    width: 70,
    height: 70,
    marginRight: 6,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mainPhoto: {
    width: widthSreen,
    height: 200,
  },
  form: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  textarea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});
