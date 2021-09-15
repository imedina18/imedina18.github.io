import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "./Home.module.css";
import { checkSession } from "../../core/session";
import Sidebar from "../../components/SideBar";

const Home = (props) => {
  const [cookie, setCookies, removeCookie] = useCookies(["usrSession"]);

  useEffect(() => {
    checkSession("home", props.history, cookie.usrSession);
    if (cookie.usrSession != undefined && cookie.usrSession.data != undefined) {
      props.history.push("/");
    }
  }, []);

  return (
    <>
      <Sidebar history={props.history}/>
      <section className={styles.content}>
        <div>Hola soy el inicio de todo</div>
      </section>
    </>
  );
};
export default Home;
