import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useGetTopProductsQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { LinkContainer } from "react-router-bootstrap";

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  // Fetch the product details
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const {
    data: recommendedProducts,
    isLoading: loading,
    error: err,
  } = useGetTopProductsQuery({ limit: 4 });

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <Card>
              {/* Product details */}
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Title>
                  <strong>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </Card.Title>
                {/* Quantity Input */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <div className='input-group'>
                          <button
                            className='btn btn-outline-secondary'
                            type='button'
                            onClick={() => setQty(Math.max(qty - 1, 1))}
                          >
                            -
                          </button>
                          <input
                            type='number'
                            className='form-control text-center'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          />
                          <button
                            className='btn btn-outline-secondary'
                            type='button'
                            onClick={() =>
                              setQty(Math.min(qty + 1, product.countInStock))
                            }
                          >
                            +
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Recommended Products */}
      {recommendedProducts && recommendedProducts.length > 0 && (
        <div className='my-4'>
          <h2>Recommended Products</h2>
          {loading ? (
            <Loader />
          ) : err ? (
            <Message variant='danger'>
              {err?.data?.message || err.error}
            </Message>
          ) : (
            <Row>
              {recommendedProducts.map((recommendedProduct) => (
                <Col key={recommendedProduct._id} sm={12} md={6} lg={4} xl={3}>
                  <LinkContainer to={`/product/${recommendedProduct._id}`}>
                    <Card className='mb-3 product-card'>
                      <div className='product-card-image'>
                        <Card.Img
                          src={recommendedProduct.image}
                          alt={recommendedProduct.name}
                          variant='top'
                        />
                      </div>
                      <Card.Body>
                        <Card.Title>{recommendedProduct.name}</Card.Title>
                        <Card.Text>
                          Price: ${recommendedProduct.price.toFixed(2)}
                        </Card.Text>
                        <Button variant='primary'>View Details</Button>
                      </Card.Body>
                    </Card>
                  </LinkContainer>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;
