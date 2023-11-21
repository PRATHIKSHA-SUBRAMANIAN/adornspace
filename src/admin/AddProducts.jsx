import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Card, CardBody, CardImg } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/AddProducts.css';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, 'products');
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
          toast.error('Images not uploaded!');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success('Product successfully added!');
      navigate('/dashboard/all-products');
    } catch (err) {
      setLoading(false);
      toast.error('Product not added!');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading..</h4>
            ) : (
              <Card>
                <Row>
                  <Col md="4">

                    <CardImg src="https://i.ebayimg.com/images/g/fRUAAOSwf9Rf0icw/s-l1600.jpg" alt="Product Image" />
                  </Col>
                  <Col md="8">

                    <CardBody>
                      <Form onSubmit={addProduct}>
                        
                        <h1 className='name'>AdornSpace</h1>
                        
                        <h3 className='mb-5'>Add Product</h3>
                        <FormGroup className='form__group'>
                          <span>Product title</span>
                          <input type="text" placeholder='Vase' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                        </FormGroup>
                        <FormGroup className='form__group'>
                          <span>Short Description</span>
                          <input type="text" placeholder='lorem...' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                        </FormGroup>
                        <FormGroup className='form__group'>
                          <span>Description</span>
                          <input type="text" placeholder='Description..' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                        </FormGroup>
                        <div className='d-flex align-items-center justify-content-between gap-5'>
                          <FormGroup className='form__group w-50'>
                            <span>Price</span>
                            <input type="number" placeholder='₹500' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                          </FormGroup>
                          <FormGroup className='form__group w-50'>
                            <span>Category</span>
                            <select className='w-100 p-2' value={enterCategory} onChange={e => setEnterCategory(e.target.value)}>
                              <option>Select Category</option>
                              <option value="vase">Vase</option>
                              <option value="clock">Clock</option>
                              <option value="bookends">Bookends</option>
                              <option value="wallarts">Wall Arts</option>
                            </select>
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup className='form__group'>
                            <span>Product Image</span>
                            <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} required />
                          </FormGroup>
                        </div>
                        <button className='buy__btn' type="submit">
                          Add Product
                        </button>
                      </Form>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
