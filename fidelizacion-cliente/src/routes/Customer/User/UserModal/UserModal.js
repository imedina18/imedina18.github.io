import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadingBtn from "../../../../assets/loaders/main-loader.svg";
import styles from "./UserModal.module.css";
import { dateToRequestDate } from "../../../../core/date";

const UserModal = ({ show, handleClose, callback }) => {
  const [cookie, setCookies, removeCookie] = useCookies(["usrSession"]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [birthDay, setBirthDay] = useState(undefined);
  const [telefono, setTelefono] = useState(undefined);
  const [role, setRole] = useState(0);
  const [roles, setRoles] = useState([]);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    retrieveRoles();
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

  const save = (body) => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_API_URL + "users", body, prepareHeaders())
      .then((rs) => {
        let data = rs.data;
        setLoading(false);
        callback();
        handleClose();
        //notify.show("Usuario registrado exitosamente", "success");
      })
      .catch((error) => {
        console.error(error.response);
        setLoading(false);
        handleClose();
        //notify.show("Ha ocurrido un error al crear el usuario", "error");
      });
  };

  const handleSave = (e) => {
    const body = {
      datosPersonales: {
        apellidos: lastName,
        fechaNacimiento: birthDay,
        foto: null,
        nombres: name,
        telefono: telefono,
      },
      email: email,
      rolSistema: parseInt(role),
      username: nickname,
    };
    save(body);
  };

  const retrieveRoles = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "rol/system", prepareHeaders())
      .then((rs) => {
        if (rs.status == 200) {
          let { data } = rs;
          setRoles(data);
        } else {
          setRoles([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setRoles([]);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Nuevo cliente</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Nombres</Form.Label>
                  <input
                    className="form-sgp"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    placeholder="Ingrese el nombre"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastname">
                  <Form.Label>Apellidos</Form.Label>
                  <input
                    className="form-sgp"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    placeholder="Ingrese el apellido"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="role">
                  <Form.Label>Rol</Form.Label>
                  <select
                    className="form-sgp"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option selected="selected" value={0}>
                      --Seleccione rol--
                    </option>
                    {roles.map((i) => (
                      <option value={i.id}>{i.descripcion}</option>
                    ))}
                  </select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="bday">
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <input
                    className="form-sgp"
                    value={birthDay}
                    onChange={(e) => setBirthDay(dateToRequestDate(e.target.value))}
                    type="date"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="phone">
                  <Form.Label>Nro de telefono</Form.Label>
                  <input
                    className="form-sgp"
                    value={telefono}
                    onChange={(e) => {
                      setTelefono(e.target.value);
                    }}
                    type="number"
                    placeholder="Número de telefono"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <input
                    className="form-sgp"
                    value={email}
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Ingrese el correo electrónico"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Form.Group controlId="nickname">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <input
                    className="form-sgp"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    type="text"
                    placeholder="Ingrese el nombre de usuario"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              background:
                "linear-gradient(135deg, #9aa29c 0, #8c8e8c 25%, #7a757a 50%, #675d69 75%, #564c5d 100%)",
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="info"
            onClick={handleSave}
            style={{ background: "linear-gradient(#5ec6ec, #03afef)" }}
          >
            {loading ? (
              <img src={loadingBtn} height="15" />
            ) : (
              <span>Registrar</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UserModal;
