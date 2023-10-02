import { Link } from "react-router-dom";
import { Carousel, Image, Row, Col } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row>
              <Col>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col>
                <Carousel.Caption className='carousel-caption text-centre'>
                  <h2 className='text-white'>
                    <strong>{product.name} </strong>(${product.price})
                  </h2>
                  <p>{product.description}</p>
                </Carousel.Caption>
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
