import React, { useState } from "react";
import products from '../assets/data/products';
import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";
import ProductsList from '../components/UI/ProductsList';
import '../styles/shop.css';

const Shop = () => {

    const [productsData, setProductsData] = useState(products);

    const handleFilter = (e) => {
        const filterValue = e.target.value;
        if (filterValue === 'clock') {
            const filteredProducts = products.filter(
                item => item.category === 'clock'
            );
            setProductsData(filteredProducts);
        };
        if (filterValue === 'vase') {
            const filteredProducts = products.filter(
                item => item.category === 'vase'
            );
            setProductsData(filteredProducts);
        };
        if (filterValue === 'bookends') {
            const filteredProducts = products.filter(
                item => item.category === 'bookends'
            );
            setProductsData(filteredProducts);
        };
        if (filterValue === 'wallarts') {
            const filteredProducts = products.filter(
                item => item.category === 'wallarts'
            );
            setProductsData(filteredProducts);
        };

    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value
        const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

        setProductsData(searchedProducts)
    }
    return (
        <Helmet title='Shop'>
            <CommonSection title='Products' />
            <section>
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option>Filter By Category</option>
                                    <option value="clock">clock</option>
                                    <option value="vase">vase</option>
                                    <option value="bookends">bookends</option>
                                    <option value="wallarts">Wall Arts</option>
                                </select>
                            </div>
                        </Col>
                        
                        <Col lg='6' md='12'>
                            <div className="search__box">
                                <input type="text" placeholder="Search here" onChange={handleSearch} />
                                <span>
                                    <i class="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        {
                            productsData.length === 0 ? (
                                <h1 className="text-center fs-4">No Products are found!</h1>
                            ) : (
                                <ProductsList data={productsData} />)
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Shop;