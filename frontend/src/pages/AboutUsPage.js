import { Container, Row, Col } from 'react-bootstrap';

const AboutUsPage = () => {
  return (
    <Container>
      <h2 className="mt-5">About Newcastle Auto Spare Parts</h2>
      <Row className="mt-3">
        <Col md={6}>
          <p>Welcome to Newcastle Auto Spare Parts, your trusted source for high-quality automotive spare parts in the Newcastle area. With years of experience in the industry, we take pride in providing top-notch products and exceptional customer service.</p>

          <h3>Our Mission</h3>
          <p>At Newcastle Auto Spare Parts, our mission is to ensure that every vehicle owner has access to reliable and affordable spare parts. We understand the importance of keeping your vehicle in excellent condition, and we're here to help you achieve that goal.</p>
        </Col>
        <Col md={6}>
          <h3>Our Products</h3>
          <p>We offer a wide range of spare parts for various makes and models of vehicles. Whether you're in need of engine components, brakes, suspension parts, or any other automotive accessory, you can trust that we have the right solution for you. All our products are sourced from reputable manufacturers known for their quality and durability.</p>

          <h3>Expert Team</h3>
          <p>Our team consists of experienced professionals who are passionate about automobiles. They have in-depth knowledge of automotive parts and can assist you in finding the perfect fit for your vehicle. Whether you're a car enthusiast or a regular driver, we're here to help.</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <h3>Customer Satisfaction</h3>
          <p>We prioritize customer satisfaction above all else. We strive to provide a seamless shopping experience, from easy navigation on our website to prompt and reliable delivery. If you have any questions or need assistance, our customer support team is always ready to help.</p>
        </Col>
        <Col md={6}>
          <h3>Visit Us</h3>
          <p>Come visit our store at [Address], where you can explore our extensive range of spare parts in person. Our friendly staff will be happy to assist you with any inquiries or recommendations you may need.</p>
          <h3>Contact Us</h3>
          <p>If you have any questions or feedback, feel free to get in touch with us. You can reach us via email at info@newcastleautospares.com or give us a call at [Phone Number]. We look forward to serving you!</p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUsPage;
