import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MdReorder } from "react-icons/md";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { BiPowerOff } from "react-icons/bi";
import styles from "./Header.module.css";
import { useHistory, useLocation } from "react-router-dom";

const Header = ({menuClose}) => {
  const [cookie, removeCookie] = useCookies(["usrSession"]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    checkPath();
  }, []);

  const logout = () => {
    removeCookie("usrSession");
    history.push("/login");
  };
  
  const checkPath = () => {
    let {pathname} = location;
    if(cookie.usrSession != undefined && "/login" == pathname) {
      history.push("/");
    }
  }

  return (
    <>
      { Object.keys(cookie).length === 0 || cookie.usrSession == undefined || cookie.usrSession.data == undefined ? (
        <></>
      ) : (
        <div className={styles.headerContainer}>
          <span style={{ cursor: "pointer" }} onClick={menuClose}>
            <MdReorder style={{ fontSize: "2em", color: "#fff" }} />
          </span>
          <div className={styles.rightSide}>
            <DropdownButton
              title={<FaUserCircle style={{ color: "#fff" }} />}
              bsPrefix={styles.dropdown}
              id="user-menu"
            >
              <Dropdown.Header style={{cursor: "context-menu"}} eventKey="0">{"@me"}</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item
                style={{ textAlign: "center" }}
                eventKey="1"
                onClick={logout}
              >
                <BiPowerOff style={{ color: "#15171c" }} /> &nbsp;&nbsp;
                <span>Cerrar sesi&oacute;n</span>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
