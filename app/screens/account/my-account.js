import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import Loading from "src/app/components/loading";
import UserGuest from "./user-guest";
import UserLogged from "./user-logged";

export default function MyAccount() {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogged(false) : setLogged(true);
    });
  }, []);

  if (logged === null) {
    return <Loading text="Cargando ..." isVisible={true} />;
  }

  return logged ? <UserLogged /> : <UserGuest />;
}
