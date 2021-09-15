import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadingBtn from "../../../../assets/loaders/main-loader.svg";

const RoleView = ({ show, handleClose, data, edit, callback }) => {
  const [cookie, setCookies] = useCookies(["usrSession"]);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setId(data != undefined ? data.id : 0);
    setCodigo(data != undefined ? data.codigo : "");
    setDescripcion(data != undefined ? data.descripcion : "");
    setName(data != undefined ? data.nombre : "");
  }, [data]);

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

  const update = (body) => {
    setLoading(true);
    axios
      .put(
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

  const handleUpdate = (e) => {
    const body = {
      codigo: codigo,
      descripcion: descripcion,
      id: 0,
    };
    update(body);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Datos del rol</b>
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
                    disabled={!edit}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="codigo">
                  <Form.Label>Codigo</Form.Label>
                  <input
                    className="form-sgp"
                    value={codigo}
                    onChange={(e) => {
                      setCodigo(e.target.value);
                    }}
                    type="text"
                    placeholder="Codigo"
                    disabled={!edit}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripcion</Form.Label>
                  <input
                    className="form-sgp"
                    value={descripcion}
                    onChange={(e) => {
                      setDescripcion(e.target.value);
                    }}
                    type="text"
                    placeholder="Descripcion"
                    disabled={!edit}
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
          {edit ? (
            <Button
              variant="info"
              onClick={handleUpdate}
              style={{ background: "linear-gradient(#5ec6ec, #03afef)" }}
            >
              {loading ? (
                <img src={loadingBtn} height="15" />
              ) : (
                <span>Actualizar</span>
              )}
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoleView;
