import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import UserInfo from "src/app/components/account/info-user";
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
    <View>
      <UserInfo
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setLoading={setLoading}
        setLoadingText={setLoadingText}
      />
      <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()} />
      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}
