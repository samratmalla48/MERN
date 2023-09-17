import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Row className=' bg-dark'>
        <Col className="sm"><p>hero</p></Col>
        <Col className="sm"><p>hero</p></Col>
        <Col className="sm"><p>hero</p></Col>
      </Row>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Newcastle Auto Spare Parts Pty Ltd &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
