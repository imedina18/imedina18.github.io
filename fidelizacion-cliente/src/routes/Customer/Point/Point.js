import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadingWait from "../../../assets/loaders/main-loader-wait.svg";
import { checkSession } from "../../../core/session";
import { Button, Form, Table } from "react-bootstrap";
import styles from "./Point.module.css";
import { FaRegGrinBeamSweat, FaInfoCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import History from "../../../components/History";
import Sidebar from "../../../components/SideBar"


const Point = (props) => {
  const [cookie, setCookies, removeCookie] = useCookies(["usrSession"]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(undefined);
  const [showUserDetail, setUserDetailVisibility] = useState(false);
  const [showDelete, setDeleteVisibility] = useState(false);
  const [showModal, setModalVisibility] = useState(false);

  const history = [
    {
        name: "Inicio",
        path: "/"
    }
  ]

  const prepareHeaders = () => {
    return {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        api_key: "",
        access_token: cookie.usrSession.data.access_token,
      },
    };
  };

  const retrieveUsers = () => {
    setLoading(true);
    axios.get(process.env.REACT_APP_API_URL + "users", prepareHeaders())
      .then((rs) => {
        if (rs.status == 200) {
          let { data } = rs;
          setLoading(false);
          setUsers(data);
        } else {
          setLoading(false);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setUsers([]);
      });
  };

  const openUserDetailView = (e, i) => {
    setUser(i);
    setUserDetailVisibility(true);
  };

  const openUserEdit = (e, i) => {
    setUser(i);
    setUserDetailVisibility(true);
    setEdit(true);
  };

  useEffect(() => {
    checkSession("customer/points", props.history, cookie.usrSession);
    retrieveUsers();
  }, []);

  const handleDelete = (e, i) => {
    setUser(i);
    setDeleteVisibility(true);
  };

  return (
    <>
      <Sidebar history={props.history}/>
      {/* <UserView show={showUserDetail} edit={edit} handleClose={() => {setUserDetailVisibility(false); setEdit(false); }} data={user} callback={retrieveUsers}/>
      <DeleteConfirm show={showDelete} handleClose={() => setDeleteVisibility(false)} data={user} callback={retrieveUsers} />
      <UserModal show={showModal} handleClose={() => { setModalVisibility(false); }} callback={retrieveUsers} /> */}
      <section className={styles.body}>
        <History items={history} current={"Puntos de clientes"} history={props.history} />
        <section className={styles.content}>
          <h1 className="">Gestionar de puntos de clientes</h1>
          <section className={styles.actions}>
            <Button
              style={{ background: "linear-gradient(#5ec6ec, #03afef)" }}
              variant="info"
              onClick={() => setModalVisibility(true)}
            >
              Buscar cliente
            </Button>
            <Form>
              <Form.Row style={{ margin: "0px" }}></Form.Row>
            </Form>
            <>
              {loading ? (<div style={{ marginTop: "15px", textAlign: "center" }}><img src={loadingWait} height="50" /> </div>)
                : users.length == 0
                  ? (<div style={{ marginTop: "15px", textAlign: "center" }}><IconContext.Provider value={{ color: "#15171c", className: "global-class-name", size: "5em" }}><FaRegGrinBeamSweat /></IconContext.Provider></div>)
                  : (
                    <Table className="sgp-table" responsive style={{ marginTop: "15px" }}>
                      <thead>
                        <th>Nombre completo</th>
                        <th>Nombre usuario</th>
                        <th>Correo electr&oacute;nico</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                      </thead>
                      <tbody>
                        {
                          users.map(i => (
                            <tr>
                              <td>{i.datosPersonales.nombres + ' ' + i.datosPersonales.apellidos}</td>
                              <td>{i.username}</td>
                              <td>{i.email}</td>
                              <td>{i.rol.descripcion}</td>
                              <td>

                                <div style={{ display: 'inline-flex' }}>
                                  <FaInfoCircle onClick={(e) => { openUserDetailView(e, i); }} height="1.4em" cursor="pointer" />&nbsp;&nbsp;
                                  <FaEdit onClick={(e) => { openUserEdit(e, i); }} height="1.4em" cursor="pointer" />&nbsp;&nbsp;
                                  <FaTrashAlt onClick={(e) => handleDelete(e, i)} height="1.4em" cursor="pointer" />
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  )
              }
            </>
          </section>
        </section>
      </section>
    </>
  );
};

export default Point;
