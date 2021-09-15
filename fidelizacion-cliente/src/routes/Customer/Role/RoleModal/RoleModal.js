import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadingBtn from "../../../../assets/loaders/main-loader.svg";

const RoleModal = ({ show, handleClose, callback }) => {
  const [cookie, setCookies, removeCookie] = useCookies(["usrSession"]);
  const [loading, setLoading] = useState(false);

  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [name, setName] = useState("");

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
      .post(
        process.env.REACT_APP_API_URL + "rol/project",
        body,
        prepareHeaders()
      )
      .then((rs) => {
        let data = rs.data;
        callback();
        setLoading(false);
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
      codigo: codigo,
      descripcion: descripcion,
      nombre: name
    };
    save(body);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Nuevo rol</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <input
                    className="form-sgp"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    placeholder="Nombre rol"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="code">
                  <Form.Label>Codigo</Form.Label>
                  <input
                    className="form-sgp"
                    value={codigo}
                    onChange={(e) => {
                      setCodigo(e.target.value);
                    }}
                    type="text"
                    max="3"
                    placeholder="Ingrese codigo"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="dexcription">
                  <Form.Label>Descripci&oacute;n</Form.Label>
                  <input
                    className="form-sgp"
                    value={descripcion}
                    onChange={(e) => {
                      setDescripcion(e.target.value);
                    }}
                    type="text"
                    placeholder="Ingrese descripcion"
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

export default RoleModal;
