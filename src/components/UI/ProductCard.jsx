import React, { useState } from 'react';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = (e) => {
    e.preventDefault();
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );
    toast.success('Product added successfully');
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div
        className="product__item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product__img">
          <img src={item.imgUrl} alt="" />
          {isHovered && (
            <span className="add-to-cart-symbol" onClick={addToCart}>
            Add to cart <i className="ri-add-line"></i>
            </span>
          )}
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">₹{item.price}</span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
