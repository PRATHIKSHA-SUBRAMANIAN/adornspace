import React,{useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from "../components/UI/CommonSection";
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';

const WallArts = () => {
    const [productsData] = useState(products);
    const WallArtsData = productsData.filter((item) => item.category === 'wallarts');

  return (
    <Helmet title="WallArts">
        <CommonSection title='WallArts' />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Wall Arts Collection</h2>
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
                                <ProductsList data={WallArtsData} />)
                        }
                    </Row>
                </Container>
            </section>
    </Helmet>
  );
};

export default WallArts;
