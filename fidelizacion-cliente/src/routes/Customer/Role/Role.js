import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadingWait from "../../../assets/loaders/main-loader-wait.svg";
import { checkSession } from "../../../core/session";
import { Button, Form, Table } from "react-bootstrap";
import styles from "./Role.module.css";
import { IconContext } from "react-icons";
import { FaRegGrinBeamSweat, FaInfoCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import RoleModal from "./RoleModal";
import DeleteConfirm from "./DeleteConfirm"
import RoleView from "./RoleView";
import History from "../../../componets/History";

const Role = (props) => {

  const [cookie, setCookies, removeCookie] = useCookies(["usrSession"]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [roleDetailVisibility, setRoleDetailVisibility] = useState(false);
  const [showDelete, setDeleteVisibility] = useState(false);
  const [showModal, setModalVisibility] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(undefined);

  const history = [
    {
        name: "Inicio",
        path: "/"
    }
  ]

  useEffect(() => {
    checkSession("user/role", props.history, cookie.usrSession);
    retrieveRole();
  }, []);

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

  const retrieveRole = () => {
    setLoading(true);
    axios.get(process.env.REACT_APP_API_URL + "rol/project", prepareHeaders())
      .then((rs) => {
        if (rs.status == 200) {
          let { data } = rs;
          setLoading(false);
          setRoles(data);
        } else {
          setLoading(false);
          setRoles([{"id":1,"descripcion": "descripcion", "codigo": "codigo"}]);
        }
      })
      .catch((error) => {
        console.error(error.response);
        setLoading(false);
        setRoles([]);
      });
  };

  const openRoleDetailView = (e, i) => {
    setRole(i);
    setRoleDetailVisibility(true);
  };

  const openRoleEdit = (e, i) => {
    setRole(i);
    setRoleDetailVisibility(true);
    setEdit(true);
  };

  const handleDelete = (e, i) => {
    setRole(i);
    setDeleteVisibility(true);
  };

  return (
    <>
      <RoleView show={roleDetailVisibility} edit={edit} handleClose={() => {setRoleDetailVisibility(false); setEdit(false); }} data={role} callback={retrieveRole}/>
      <DeleteConfirm show={showDelete} handleClose={() => setDeleteVisibility(false)} data={role} callback={retrieveRole} />
      <RoleModal show={showModal} handleClose={() => { setModalVisibility(false); }} callback={retrieveRole} />
      <section className={styles.body}>
        <History items={history} current={"Gestión de roles"} history={props.history} />
        <section className={styles.content}>
          <h1 className="">Gesti&oacute;n de roles</h1>
          <section className={styles.actions}>
            <Button
              style={{ background: "linear-gradient(#5ec6ec, #03afef)" }}
              variant="info"
              onClick={() => setModalVisibility(true)}
            >
              Registrar rol
            </Button>
            <Form>
              <Form.Row style={{ margin: "0px" }}></Form.Row>
            </Form>
            <>
              {loading ? (<div style={{ marginTop: "15px", textAlign: "center" }}><img src={loadingWait} height="50" /> </div>)
                : roles.length == 0
                  ? (<div style={{ marginTop: "15px", textAlign: "center" }}><IconContext.Provider value={{ color: "#15171c", className: "global-class-name", size: "5em" }}><FaRegGrinBeamSweat /></IconContext.Provider></div>)
                  : (
                    <Table className="sgp-table" responsive style={{ marginTop: "15px" }}>
                      <thead>
                        <th>Rol</th>
                        <th>Codigo rol</th>
                        <th>Acciones</th>
                      </thead>
                      <tbody>
                        {
                          roles.map(i => (
                            <tr>
                              <td>{i.descripcion}</td>
                              <td>{i.codigo}</td>
                              <td>
                                <div style={{ display: 'inline-flex' }}>
                                  <FaInfoCircle onClick={(e) => { openRoleDetailView(e, i); }} height="1.4em" cursor="pointer" />&nbsp;&nbsp;
                                  <FaEdit onClick={(e) => { openRoleEdit(e, i); }} height="1.4em" cursor="pointer" />&nbsp;&nbsp;
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

export default Role;
