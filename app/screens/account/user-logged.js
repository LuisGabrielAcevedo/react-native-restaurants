import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import UserInfo from "src/app/components/account/info-user";
import AccountOptions from "src/app/components/account/account-options";
import Toast from "react-native-easy-toast";
import Loading from "src/app/components/loading";

export default function UserLogged() {
  const toastRef = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [reload, setReloadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reload]);

  return (
    <View style={styles.viewUserInfo}>
      <UserInfo
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setLoading={setLoading}
        setLoadingText={setLoadingText}
      />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btn}
        titleStyle={styles.btnText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btn: {
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 0,
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnText: {
    color: "#00a680",
  },
});
