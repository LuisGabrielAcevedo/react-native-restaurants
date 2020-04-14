import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "src/app/components/loading";
import AddRestaurantForm from "src/app/components/restaurants/add-restaurant-form";

export default function AddRestaurant(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <AddRestaurantForm
        navigation={navigation}
        toastRef={toastRef}
        setLoading={setLoading}
      />
      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading text="Creando restaurante" isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({});
