import { Row, Col, Carousel } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from 'react-router-dom';
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  const{keyword} = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery({keyword
  });
  

  return (
    <>{!keyword?<ProductCarousel/>:(console.log("go back"))}
      
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <h3>{product.name}</h3>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
