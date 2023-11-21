import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/checkout.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        postalCode: "",
        country: ""
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        const allFieldsFilled = Object.values(formData).every(value => value !== "");
        setIsButtonDisabled(!allFieldsFilled);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
    }

    return (
        <Helmet title='Checkout'>
            <CommonSection title='Checkout' />
            <section>
                <Container>
                    <Form className="billing__form" onSubmit={handleFormSubmit}>
                        <Row>
                            <Col lg='8'>
                                <h6 className="mb-4 fw-bold">Billing Information</h6>

                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input
                                        type="number"
                                        placeholder="Phone number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Street address"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        name="country"
                                        value="India"
                                       
                                        
                                    />
                                </FormGroup>

                                <button type="submit" className={`buy__btn w-50 align-items-center ${isButtonDisabled ? "disabled" : ""}`}>Submit</button>
                            </Col>
                        </Row>
                        <br />
                        {isFormSubmitted && (
                            <Row>
                                <Col lg='4' className="pt-10">
                                    <div className="checkout__cart">
                                        <h6>
                                            Total Qty: <span>{totalQty} items</span>
                                        </h6>
                                        <h6>
                                            SubTotal :<span>₹{totalAmount}</span>
                                        </h6>
                                        <h6>
                                            <span>
                                                Shipping : <br />
                                                free shipping
                                            </span>
                                            <span>₹0</span>
                                        </h6>
                                        <h4>
                                            Total Cost: <span>₹{totalAmount}</span>
                                        </h4>
                                        <Link to={`/payment/${totalAmount}`}>
                                            <button className="auth__btn buy__btn w-100" >
                                                Pay now
                                            </button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </Form>
                </Container>
            </section>
        </Helmet>
    );
};

export default Checkout;
