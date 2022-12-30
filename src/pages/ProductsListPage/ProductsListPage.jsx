import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Image, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../redux/reducers/product/product.actions';
import ProductActionTypes from '../../redux/reducers/product/product.types';
import Swal from 'sweetalert2';

const ProductsListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productList);
  const { loading, error, products, } = productsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;



  useEffect(() => {
    dispatch({ type: ProductActionTypes.PRODUCT_CREATE_RESET });
    if (successCreate) {
      history.push(`/product/${createdProduct._id}/add`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    pageNumber,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to undo this action if you proceed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));

        Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
      }
    });
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const [searchWord,setSearchWord] = useState("");
  const handleFilter = (event)=>{

    const searchPlant = event.target.value;
    console.log(searchPlant);
    setSearchWord(searchPlant);

    if (searchPlant === '') {
      console.log("Empty")
      dispatch(listProducts('', pageNumber))
    } else {
      dispatch(listProducts(searchWord, pageNumber))
    }


  }
  return (
    <>
    <Container>
      <Row md={10}>
        <Col xs={3}>
          <h1>Products</h1>
        </Col>
      </Row>
      </Container>
      <Row className='align-items-center'>
        <Col>
          <input style={{ borderRadius: '30px' }} className='form-control' type='search' placeholder='Search' name='searchPlant' onChange={handleFilter}></input>
        </Col>
        <Col>
          <Button style={{ backgroundColor: '#001EB9', borderRadius: '30px' }} >
            <i className='fas fa-search fa-xl'></i> Search
          </Button>
        </Col>
        <Col className='text-right'>
          <Button style={{ backgroundColor: '#001EB9', borderRadius: '10px' }} className='my-3 mr-3' onClick={createProductHandler}>
            New Product
          </Button>
          <Button style={{ backgroundColor: '#FFFFFF', color: '#001EB9', borderRadius: '10px', border: '2px solid #001EB9' }} >
            <i className='fas fa-star fa-xl'></i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <ErrorMessage variant='danger'>{errorCreate}</ErrorMessage>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
          <Table>
            <thead>
              <tr style={{ color: "#001EB9"}}>
                <th>SKU</th>
                <th>IMAGE</th>
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>

                  <td>{product.category}</td>
                  <td><Image style={{ height: '45px' }} src={product.image} alt={product.name} fluid /></td>

                  <td>{product.name}</td>
                  <td>${product.price}</td>

                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash' style={{ color: "#001EB9" }}></i>
                    </Button>
                    <LinkContainer to={`/product/${product._id}/edit`} style={{ color: "#001EB9" }}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-pen'></i>
                      </Button>
                    </LinkContainer>
                      <Button variant='light' className='btn-sm' style={{ color: "#001EB9" }}>
                        <i className='fas fa-star'></i>
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductsListPage;
