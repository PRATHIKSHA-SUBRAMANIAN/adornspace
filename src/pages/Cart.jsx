import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const isCartEmpty = cartItems.length === 0;
    const dispatch = useDispatch();

    const deleteProduct = (item) => {
        dispatch(cartActions.deleteItem(item.id));
    };

    const increaseQuantity = (item) => {
        dispatch(cartActions.incrementQuantity(item.id));
    };

    const decreaseQuantity = (item) => {
        dispatch(cartActions.decrementQuantity(item.id));
    };

    return (
        <Helmet title='Cart'>
            <CommonSection title='Shopping Cart' />
            <section>
                <Container>
                    <Row>
                        <Col lg='9'>
                            {isCartEmpty ? (
                                <h2 className="fs-4 text-center">No item added to the cart</h2>
                            ) : (
                                <table className="table bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <Tr
                                                item={item}
                                                key={index}
                                                deleteProduct={() => deleteProduct(item)}
                                                increaseQuantity={() => increaseQuantity(item)}
                                                decreaseQuantity={() => decreaseQuantity(item)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </Col>
                        <Col lg='3'>
                            <div>
                                <h6 className="d-flex align-items-center justify-content-between">
                                    SubTotal
                                    <span className="fs-4 fw-bold">₹{totalAmount}</span>
                                </h6>
                            </div>
                            <p className="fs-6 mt-2">Taxes and shipping will calculate in checkout</p>
                            <div>
                                {isCartEmpty ? (
                                    <p className="text-danger">The cart has no items.</p>
                                ) : (
                                    <button className="buy__btn w-100">
                                        <Link to='/checkout'>Checkout</Link>
                                    </button>
                                )}
                                <button className="buy__btn w-100 mt-3">
                                    <Link to='/shop'>Continue Shopping</Link>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

const Tr = ({ item, deleteProduct, increaseQuantity, decreaseQuantity }) => {
    return (
        <tr>
            <td><img src={item.imgUrl} alt="" /></td>
            <td>{item.productName}</td>
            <td>{item.price}</td>
            <td className="quantity-button"> 
                <button onClick={decreaseQuantity}>-</button>
                &nbsp; {item.quantity} &nbsp;
                <button onClick={increaseQuantity}>+</button>
            </td>
            <td className="mt-2">
                <motion.i
                    whileTap={{ scale: 1.2 }}
                    onClick={deleteProduct}
                    className="ri-delete-bin-line"
                />
            </td>
        </tr>
    );
};

export default Cart;
