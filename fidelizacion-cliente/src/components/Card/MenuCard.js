import React from "react";
import styles from "./MenuCard.module.css";
import { Card } from "react-bootstrap";
import { IconContext } from "react-icons";

const MenuCard = ({ history, menu, path, representation, icon }) => {
  const go = (e) => history.push(path);
  return (
    <div className={`${styles.container}`}>
      <Card className={`text-center ${styles.card}`} onClick={go}>
        <Card.Header className={styles.cardHeader}>
          <span className={styles.cardTitle}>{menu}</span>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          {icon !== undefined ? (
            <img src={icon} alt="logo" height="150" />
          ) : (
            <IconContext.Provider value={{color:"#15171c", className: "global-class-name", size: "5em" }}>
                {representation}
            </IconContext.Provider>
          )}
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <span className={styles.acceder}>Acceder</span>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default MenuCard;
