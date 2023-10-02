import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';

const HomePage = () => {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <ProductCarousel /> : null}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 className='mb-4'>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <LinkContainer to={`/product/${product._id}`}>
                  <Card className='mb-3 product-card'>
                    <div className='product-card-image'>
                      <Card.Img src={product.image} alt={product.name} variant='top' />
                    </div>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                      <Button variant='primary'>View Details</Button>
                    </Card.Body>
                  </Card>
                </LinkContainer>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
