import { Link } from "react-router-dom";
import { Carousel, Image, Row, Col } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Message variant="danger">Failed to load products</Message>;
  }

  // Limit the number of products displayed in the carousel
  const visibleProducts = products.slice(0, 3);

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {visibleProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row>
              <Col>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col>
                <Carousel.Caption className="carousel-caption text-center">
                  <h2 className="text-white">
                    <strong>{product.name}</strong> (${product.price})
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
