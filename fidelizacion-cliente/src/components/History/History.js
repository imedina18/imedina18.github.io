import React from "react";
import styles from "./History.module.css";
import { IconContext } from "react-icons";
import { MdKeyboardArrowRight } from "react-icons/md";

const History = ({ history, items, current, contentDistance }) => {

    const go = (e, path) => history.push(path);

    const containerStyle = {
        padding: "10px",
        paddingLeft: "15px",
        paddingRight: "50px",
        marginBottom: "20px",
        borderRadius: "10px",
        display: "inline-block"
    };
    
    if(contentDistance !== undefined){
        delete containerStyle["display"];
        containerStyle.paddingLeft = "0px";
    }

    return (
        <div style={containerStyle}>
            {
                items.map((item) => (
                    <>
                        <span className={styles.link} onClick={(e) => {go(e, item.path);}}>{item.name}</span>
                        <IconContext.Provider value={{ color: "#15171c", size: "2em" }}><MdKeyboardArrowRight /></IconContext.Provider>
                    </>
                ))
            }
            <span className={styles.current}>{current}</span>
        </div>
    );

};

export default History;