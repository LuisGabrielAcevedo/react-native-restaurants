import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "src/app/components/modal";
import ChangePasswordForm from "./change-password-form";
import ChangeEmailForm from "./change-email-form";
import ChangeNameForm from "./change-name-form";

export default function AccountOptions(props) {
  const { userInfo, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [component, setComponent] = useState(null);
  const menuOptions = [
    {
      title: "Cambiar nombre y apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        selectedComponent("displayName");
      },
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        selectedComponent("email");
      },
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => {
        selectedComponent("password");
      },
    },
  ];

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setComponent(
          <ChangeNameForm
            displayName={userInfo.displayName}
            setIsVisible={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        break;
      case "email":
        setComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisible={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        break;
      case "password":
        setComponent(
          <ChangePasswordForm
            setIsVisible={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        break;
      default:
        break;
    }
    setIsVisibleModal(true);
  };

  return (
    <View>
      {menuOptions.map((option, i) => (
        <ListItem
          title={option.title}
          leftIcon={{
            type: option.iconType,
            name: option.iconNameLeft,
            color: option.iconColorLeft,
          }}
          rightIcon={{
            type: option.iconType,
            name: option.iconNameRight,
            color: option.iconColorRight,
          }}
          key={i}
          onPress={option.onPress}
          containerStyle={styles.menuOption}
        />
      ))}
      {component && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {component}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuOption: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
