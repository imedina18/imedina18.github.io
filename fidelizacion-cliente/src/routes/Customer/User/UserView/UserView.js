import { Modal, Button, Form, Row, Col, FormGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadingBtn from "../../../../assets/loaders/main-loader.svg";
import {dateToRequestDate} from "../../../../core/date";

const UserView = ({ show, handleClose, data, edit, callback }) => {

  const [cookie, setCookies, removeCookie] = useCookies(["usrSession"]);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [name, setName] = useState(
    data != undefined ? data.datosPersonales.nombres : undefined
  );
  const [lastName, setLastName] = useState(
    data != undefined ? data.datosPersonales.apellidos : undefined
  );
  const [role, setRole] = useState(data != undefined ? data.role : 0);
  const [birthDay, setBirthDay] = useState(
    data != undefined ? dateToRequestDate(new String(new Date(data.datosPersonales.fechaNacimiento))) : undefined
  );
  const [telefono, setTelefono] = useState(
    data != undefined ? data.telefono : undefined
  );
  const [email, setEmail] = useState(
    data != undefined ? data.email : undefined
  );
  const [nickname, setNickname] = useState(
    data != undefined ? data.username : undefined
  );
  const [roles, setRoles] = useState([]);

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

  useEffect(() => {
    console.log(data);
    setName(data != undefined ? data.datosPersonales.nombres : undefined);
    setLastName(data != undefined ? data.datosPersonales.apellidos : undefined);
    setEmail(data != undefined ? data.email : undefined);
    setBirthDay(
      data != undefined ? data.datosPersonales.fechaNacimiento : undefined
    );
    setTelefono(data != undefined ? data.datosPersonales.telefono : undefined);
    setRole(data != undefined ? data.role : 1);
    setNickname(data != undefined ? data.username : undefined);
  }, [data]);

  const handleUpdate = (e) => {
    var body = {
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
    update(body);
  };

  const update = (body) => {
    setUpdateLoading(true);
    axios
      .put(process.env.REACT_APP_API_URL + "user", body, prepareHeaders())
      .then((rs) => {
        console.log(rs);
        if (rs.status == 200) {
          let { data } = rs;
          //notify.show("Se ha actualizado la información exitosamente", "success");
          setUpdateLoading(false);
          handleClose();
          callback();
        } else {
          setUpdateLoading(false);
          //notify.show("Ha ocurrido un error al actualizar la información", "error");
          handleClose();
          callback();
        }
      })
      .catch((error) => {
        console.error(error);
        setUpdateLoading(false);
        //notify.show("Ha ocurrido un error al actualizar la información", "error");
        handleClose();
        callback();
      });
  };

  const retrieveRoles = () => {
    axios.get(process.env.REACT_APP_API_URL + "rol/system", prepareHeaders())
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
            <b>Informaci&oacute;n de cliente</b>
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
                    disabled={!edit}
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
                    disabled={!edit}
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
                    as="select"
                    disabled={!edit}
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option selected="selected" value={0}>--Seleccione rol--</option>
                    {
                      roles.map(i =>(
                        <option value={i.id}>{i.descripcion}</option>
                      ))
                    }
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
                    disabled={!edit}
                    value={birthDay}
                    onChange={(e) => {
                      setBirthDay(dateToRequestDate(e.target.value));
                    }}
                    type="date"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="phone">
                  <Form.Label>Nro de telefono</Form.Label>
                  <input
                    className="form-sgp"
                    disabled={!edit}
                    value={telefono}
                    onChange={(e) => {
                      setTelefono(e.target.value);
                    }}
                    type="text"
                    placeholder="Ingrese su número de telefono"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <input
                    className="form-sgp"
                    disabled
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
                    disabled={!edit}
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
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
            {edit ? "Cancelar" : "Cerrar"}
          </Button>
          {
            edit ? 
                  <Button
                  variant="info"
                  onClick={handleUpdate}
                  style={{ background: "linear-gradient(#5ec6ec, #03afef)" }}
                >
                  {updateLoading ? (
                    <img src={loadingBtn} height="15" />
                  ) : (
                    <span>Actualizar</span>
                  )}
                </Button>
                 : <></>
          }
          
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UserView;
