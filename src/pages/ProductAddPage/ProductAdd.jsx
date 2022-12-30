import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import { productDetails } from '../../redux/reducers/productdetails/productdetails.actions';
import { updateProduct } from '../../redux/reducers/product/product.actions';
import ProductActionTypes from '../../redux/reducers/product/product.types';
import Swal from 'sweetalert2';


const ProductAddPage = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const price = 24;
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ProductActionTypes.PRODUCT_UPDATE_RESET });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added Successfully!',
        showConfirmButton: false,
        timer: 1000,
      });
      history.push('/');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetails(productId));
      } else {
        setBrand(product.brand);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please Upload Images Only xD!',
        showConfirmButton: false,
        timer: 3000,
      });
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };


  return (
    <>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={16}>
            <Row>
              <Col xs={3}>
                <a href='/' style={{textDecoration: 'none'}}>
                <h1>Products</h1>
                </a>
                
              </Col>
              <Col xs={1}>
                <i style={{ color: '#001EB9', paddingTop: '17px' }} className="fas fa-chevron-right fa-2x"></i>
              </Col>
              <Col xs={7}>
                <h3 style={{ color: '#001EB9' }}>Add New Product</h3>
              </Col>
            </Row>
            {loadingUpdate && <Loader />}
            {errorUpdate && (
              <ErrorMessage variant='danger'>{errorUpdate}</ErrorMessage>
            )}

            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage variant='danger'>{error}</ErrorMessage>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='countInStock'>
                  <Form.Label>SKU</Form.Label>
                  <Form.Control


                    placeholder='SKU'
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'

                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>



                <Form.Group controlId='image'>
                  <Form.Label>Image </Form.Label>
                  {/* <Form.Control
                    type='text'
                    
                    placeholder='Enter Image URL'
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control> */}
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                    formNoValidate
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>QTY</Form.Label>
                  <Form.Control
                    type='number'

                    placeholder='Enter Count In Stock'
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'

                    placeholder='Enter Description '
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button className='btn btn-primary my-3' type='submit' style={{ backgroundColor: '#001EB9', borderRadius: '10px' }}>
                  Add Product
                </Button>
                <Link to='/' className='btn btn-primary my-3' style={{ backgroundColor: '#001EB9', borderRadius: '10px',  float:'right' }}>
                  Go Back
                </Link>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductAddPage;
