import React, { useState, useEffect } from "react";
import MenuCard from "../../components/Card";
import styles from "./Usuario.module.css"
import { FaUsersCog} from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import Sidebar from "../../components/SideBar";

const Customer = (props) => {

    return (
        <>
            <Sidebar history={props.history}/>
            <section className={styles.content}>
                <MenuCard history={props.history} menu="Agregar Cliente" representation={<MdGroupAdd />} path={"customer/actions"} />
                <MenuCard history={props.history} menu="Roles" representation={<FaUsersCog/>} path={"user/role"}/>
            </section>
        </>
    );
}

export default Customer;