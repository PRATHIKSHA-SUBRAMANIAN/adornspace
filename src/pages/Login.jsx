import React, { useState } from "react";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) {
            setPasswordError('');
        }
    };

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (validateForm()) {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                console.log(user);
                setLoading(false);
                toast.success('Successfully logged in');
                if (user && user.email === "admin@gmail.com") {
                    navigate("/dashboard");
                } else {
                    navigate("/home");
                }
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <Helmet title="Login">
            <section>
                <Container>
                    <Row className="log mt-2">
                        {
                            loading ? (
                                <Col lg='8' className="text-center">
                                    <h5 className="fw-bold">Loading..</h5>
                                </Col>
                            ) : (
                                
                                    <Row lg='8' className="frm">

                                        <Col lg='5' className="m-auto text-center">
                                            <h3 className="fw-bold mb-4 text-white pt-2">Login</h3>
                                            <Form className="auth__form" onSubmit={signIn}>
                                                <FormGroup className="form__group">
                                                    <input type="email" placeholder="Enter your email"
                                                        value={email} onChange={handleEmailChange} />
                                                    {emailError && <div className="error-message">{emailError}</div>}
                                                </FormGroup>

                                                <FormGroup className="form__group">
                                                    <input type="password" placeholder="Enter your password"
                                                        value={password} onChange={handlePasswordChange} />
                                                    {passwordError && <div className="error-message">{passwordError}</div>}
                                                </FormGroup>

                                                <button type="submit" className="buy__btn">Login</button>
                                                <p>
                                                    Don't have an account? {" "}
                                                    <Link to='/signup'>Create an account</Link>
                                                </p>
                                            </Form>
                                        </Col>
                                        <Col lg='5' className="image">
                                            <img src="https://image.made-in-china.com/2f0j00RmGinWAzZPbU/China-Cabinet-Decoration-Items-Home-Accessories-Ceramic-Rustic-Country-Living-Room-Decor.webp" alt="" height={"400px"} width={"350px"} />
                                        </Col>

                                    </Row>
                                
                            )
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Login;
