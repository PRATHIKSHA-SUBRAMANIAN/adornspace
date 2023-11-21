import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg1 from '../assets/images/wallart1.jpg';
import heroImg2 from '../assets/images/banner.jpg';
import '../styles/home.css';
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import useGetData from '../custom-hooks/useGetData';
import { Card, CardImg, CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const { data: products, loading } = useGetData("products")

    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);

    const navigate = useNavigate();

    // Mock data for demonstration
    const cardproducts = [
        {
            id: 1,
            title: 'Bookends',
            imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/a/l/494x544/aluminium-deer-s-bookend-by-decor-de-maison-aluminium-deer-s-bookend-by-decor-de-maison-rbt7q2.jpg',
            link: '../bookends',
        },
        {
            id: 2,
            title: 'Vase',
            imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/g/l/494x544/gleaming-black-glass-vase-by-the-decor-kart-gleaming-black-glass-vase-by-the-decor-kart-obwk7x.jpg',
            link: '../vase',
        },
        {
            id: 3,
            title: 'Clocks',
            imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/b/l/494x544/black---gold-mild-steel---glass-modern-wall-clock-by-logam-black---gold-mild-steel---glass-modern-wa-tnn5g1.jpg',
            link: '../clock',
        },
        {
            id: 4,
            title: 'Wall Arts',
            imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/m/o/494x544/mount-everest-metal-wall-art-by-the-next-decor-mount-everest-metal-wall-art-by-the-next-decor-bmcdcw.jpg',
            link: '../wallarts',
        },
    ];

    const year = new Date().getFullYear()

    useEffect(() => {
        const filteredTrendingProducts = products.filter(
            item => item.category === 'vase'
        );

        const filteredBestSalesProducts = products.filter(
            item => item.category === 'clock'
        );

        setTrendingProducts(filteredTrendingProducts);
        setBestSalesProducts(filteredBestSalesProducts);

    }, [products]);

    return (
        <Helmet title={'Home'}>
            <section className="hero__section">
                <Container>
                    <Row>
                        
                        <Col lg='4' md='4'>
                            <div className="hero__img">
                                <img src={heroImg1} alt="" />
                            </div>
                        </Col>
                        <Col lg='4' md='4'>
                            <div className="hero__content">
                                <p className="hero__subtitle">Trending product in {year}</p>
                                <h3>Make Your Home More Modern</h3>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero deleniti tempora corrupti odit nesciunt.</p>
                                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"><Link to='/shop'>SHOP NOW</Link></motion.button>
                            </div>
                        </Col>

                        <Col lg='4' md='4' >
                            <div className="hero__img">
                                <img src={heroImg1} alt="" />
                            </div>
                        </Col>
                        <Services />
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        <div className="pt-5">
                            <img src={heroImg2} alt="" />
                        </div>
                    </Row>

                </Container>

            </section>

            <section className="trending__products">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title mb-5">Trending Products</h2>
                        </Col>

                        {
                            loading ? <h5 className="fw-bold text-center">Loading...</h5> : <ProductsList data={trendingProducts} />
                        }

                    </Row>
                </Container>
            </section>

            <section className="popular__category">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-5">
                            <h2 className="section__title text-white">Shop By Category</h2>
                        </Col>

                        {loading ? (
                            <h5 className="fw-bold text-center">Loading...</h5>
                        ) : (
                            cardproducts.map((product) => (
                                <Col key={product.id} md="3" className="mb-3">
                                    <Card
                                        onClick={() => navigate(`/${product.link}`)}
                                        className="cursor-pointer rounded-card"
                                    >
                                        <CardImg top height={"250px"} width="100%" src={product.imageUrl} alt={product.title} />

                                    </Card>
                                    <CardBody className="text-center">
                                        <h5 className="card-title">{product.title}</h5>
                                    </CardBody>
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </section>

            <section className="best__sales">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title mb-5">Best Sales</h2>
                        </Col>
                        {
                            loading ? <h5 className="fw-bold text-center">Loading...</h5> : <ProductsList data={bestSalesProducts} />
                        }

                    </Row>
                </Container>
            </section>

            {/* <section className="new__arrivals">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-5">
                            <h2 className="section__title">New Arrivals</h2>
                        </Col>
                        {
                            loading ? <h5 className="fw-bold text-center">Loading...</h5> : <ProductsList data={trendingProducts} />
                        }
                        {
                            loading ? <h5 className="fw-bold text-center">Loading...</h5> : <ProductsList data={bestSalesProducts} />
                        }
                    </Row>
                </Container>
            </section> */}




        </Helmet>
    );
};

export default Home;
