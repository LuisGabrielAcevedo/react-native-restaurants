import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.view} centerContent={true}>
      <Image
        source={require("src/app/components/images/original.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil</Text>
      <Text style={styles.description}>
        ¿Cómo describirias tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado mas y cometa
        como ha sido tu experiencia
      </Text>
      <View style={styles.btnContent}>
        <Button
          title="Ver tu perfil"
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  view: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  btnContent: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    width: "70%",
  },
});
