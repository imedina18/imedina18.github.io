import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Col
} from 'react-bootstrap';
import styles from './Login.module.css';
import loadingBtn from '../../assets/loaders/main-loader.svg';
import {checkSession} from "../../core/session";
import logo from '../../assets/img/icon.png';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';

const Login = (props) => {

    const [cookie, setCookies, removeCookie] = useCookies(['usrSession']);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkSession("login", props.history, cookie.usrSession);
    }, []);

    const goHome = () => {
        props.history.push("/");
    }

    const onEnter = (e, action) => {
        if (onEnter != undefined && onEnter != null) {
            if (e.charCode == 13) {
                action();
            }
        }
    }

    const login = (body, config) => {
        setLoading(true);
        setCookies("usrSession", {data:{rol:"ADM"}});
        goHome();
        /* axios.post(process.env.REACT_APP_API_URL + "authentication/login", body, config)
            .then(rs => {
                let {data} = rs;
                setCookies("usrSession", data);
                setLoading(false);
                goHome();
            }).catch(error => {
                console.error(error.response);
                setLoading(false);
                NotificationManager.error("Usuario o contraseña incorrectos"); 
                notify.show("Usuario o contraseña incorrectos", "error");
            }); */
    }

    const handleLogin = () => {
        let body = {
            data: {
                email: email,
                password: password
            }
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
        };
        login(body, axiosConfig);
    }

    return (
        <>
            <div className={`col-md-12 ${styles.backgroundImgLogin}`}>
                <div className={styles.loginContainer}>
                    <div className={`col-md-4 ${styles.loginBox}`}>
                        <div className={styles.imageContent}>
                            <img src={logo} className={styles.imgLogStyle} alt="SGP" />
                        </div>
                        <Form className={styles.formLogin}>
                            <FormGroup className={styles.alingContentForm} controlId="formUsername">
                                <Col md={12} sm={12} xs={12}>
                                    <input type="email" className="form-sgp"
                                        placeholder="correo electr&oacute;nico" value={email}
                                        onChange={(e) => { setEmail(e.target.value); }}
                                        onKeyPress={(e) => { onEnter(e, handleLogin) }}
                                        required
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup className={styles.alingContentForm} controlId="formPassword">
                                <Col md={12} sm={12} xs={12}>
                                    <input type="password" className="form-sgp"
                                        placeholder="Ingrese su contrase&ntilde;a" value={password}
                                        onChange={(e) => { setPassword(e.target.value); }}
                                        onKeyPress={(e) => { onEnter(e, handleLogin) }}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col md={12} sm={12} xs={12}>
                                    <div className={styles.alingContentForm}>
                                        <Button style={{ width: "100%" }}
                                            variant="info"
                                            size="sm"
                                            onClick={handleLogin}>
                                            {
                                                loading ? (
                                                    <img src={loadingBtn} height="18" />
                                                ) : (<span>Ingresar</span>)
                                            }
                                        </Button>
                                    </div>
                                </Col>
                                <Col className={styles.alingContentForm} sm={12} xs={12}>
                                    <a className={styles.info}>Sistema de fidelizaci&oacute;n de cliente</a>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
            {/* <NotificationContainer/> */}
        </>
    );
};

export default Login;