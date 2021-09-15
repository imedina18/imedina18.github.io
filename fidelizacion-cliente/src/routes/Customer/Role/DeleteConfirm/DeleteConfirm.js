import { Modal, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import loadingBtn from "../../../../assets/loaders/main-loader.svg";

const DeleteConfirm = ({ show, handleClose, data, callback }) => {

    const [cookie, setCookies, removeCookie] = useCookies(["usrSession"]);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(data != undefined ? data.id : undefined);
    const [codigo, setCodigo] = useState(data != undefined ? data.codigo : undefined);
    const [descripcion, setDescripcion] = useState(data != undefined ? data.descripcion : undefined);

  useEffect(() => {
    setId(data != undefined ? data.id : undefined);
    setCodigo(data != undefined ? data.codigo : undefined);
    setDescripcion(data != undefined ? data.descripcion : undefined);
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

  const deleteRole = (e) => {
    setLoading(true);
    axios.delete(process.env.REACT_APP_API_URL + "rol/project/" + id, prepareHeaders())
      .then((rs) => {
        callback();
        setLoading(false);
        handleClose();
        //notify.show("Se ha eliminado el usuario exitosamente", "success");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        handleClose();
        //notify.show("Ha ocurrido un error al eliminar al usuario", "error");
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Confirmar eliminación</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Está seguro que desea eliminar el codigo {codigo} y descripcion {descripcion} ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              background:
                "linear-gradient(135deg, #9aa29c 0, #8c8e8c 25%, #7a757a 50%, #675d69 75%, #564c5d 100%)",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            Cerrar
          </Button>
          <Button style={{ background: "linear-gradient(135deg, #ff7500 0, #ff6103 12.5%, #ff4c1c 25%, #ff3328 37.5%, #f30d2f 50%, #e10034 62.5%, #d00038 75%, #c1003c 87.5%, #b2003f 100%)" }} variant="danger" onClick={deleteRole}>
          {loading ? (
              <img src={loadingBtn} height="15" />
            ) : (
              <span>Eliminar</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteConfirm;