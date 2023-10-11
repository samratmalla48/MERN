import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image,Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductsByCategoryQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

const ProductsByCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(id);

  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate("/cart");
  };

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={4}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                </Link>

                <Card.Body>
                  <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                      <strong>{product.name}</strong>
                    </Card.Title>
                  </Link>

                  <Card.Text as="div">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </Card.Text>

                  <Card.Text as="h3">${product.price}</Card.Text>

                  <Button
                    onClick={() => addToCartHandler(product)}
                    variant="primary"
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductsByCategory;
