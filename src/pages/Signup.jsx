import React, { useState } from "react";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import '../styles/signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fileError, setFileError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;

        if (!username) {
            setUsernameError('Username is required');
            valid = false;
        } else {
            setUsernameError('');
        }

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

        if (!file) {
            setFileError('File is required');
            valid = false;
        } else {
            setFileError('');
        }

        return valid;
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (usernameError) {
            setUsernameError('');
        }
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        if (fileError) {
            setFileError('');
        }
    };

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (validateForm()) {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                const storageRef = ref(storage, `images/${Date.now() + username}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    (error) => {
                        toast.error(error.message);
                    }, () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(user, {
                                displayName: username,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, 'users', user.uid),
                                {
                                    uid: user.uid,
                                    displayName: username,
                                    email,
                                    photoURL: downloadURL,
                                });
                        });
                    }
                );

                setLoading(false);
                toast.success("Account Created");
                navigate('/login');
            } catch (error) {
                setLoading(false);
                toast.error('Something went wrong');
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <Helmet title="Signup">
            <section>
                <Container className='signup'>
                    <Row>
                        {
                            loading ? (
                                <Col lg='12' className="text-center">
                                    <h5 className="fw-bold">Loading...</h5>
                                </Col>
                            ) : (
                                <Row lg='10' className="frm">
                                    <Col lg='5' className="m-auto text-center">
                                        <h3 className="fw-bold mb-4 text-white pt-2">SignUp</h3>
                                        <Form className="auth__form" onSubmit={signup}>
                                            <FormGroup className="form__group">
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    value={username}
                                                    onChange={handleUsernameChange}
                                                />
                                                {usernameError && <div className="error-message">{usernameError}</div>}
                                            </FormGroup>
                                            <FormGroup className="form__group">
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                />
                                                {emailError && <div className="error-message">{emailError}</div>}
                                            </FormGroup>
                                            <FormGroup className="form__group">
                                                <input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                />
                                                {passwordError && <div className="error-message">{passwordError}</div>}
                                            </FormGroup>
                                            <FormGroup className="form__group">
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                                {fileError && <div className="error-message">{fileError}</div>}
                                            </FormGroup>
                                            <button type="submit" className="buy__btn auth__btn">Create an Account</button>
                                            <p>
                                                Already have an account? {" "}
                                                <Link to='/login'>Login Here</Link>
                                            </p>
                                        </Form>
                                    </Col>
                                    <Col lg='5' className="image">
                                        <img src="https://m.media-amazon.com/images/I/417erxt9ECL.jpg" alt="" height={"500px"} width={"500px"} />
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

export default Signup;


