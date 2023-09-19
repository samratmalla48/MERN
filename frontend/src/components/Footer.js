import { Container, Row, Col, NavLink } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container fluid className='footer bg-dark text-white'>
        <Container>
          <Row>
            <Col xs={4}>
              <h5>Column 1</h5>
              <ul className='list-unstyled'>
                <NavLink href='#'>Link 1</NavLink>
                <NavLink href='#'>Link 2</NavLink>
                <NavLink href='#'>Link 3</NavLink>
              </ul>
            </Col>
            <Col xs={4}>
              <h5>Column 2</h5>
              <ul className='list-unstyled'>
                <NavLink href='#'>Link 1</NavLink>
                <NavLink href='#'>Link 2</NavLink>
                <NavLink href='#'>Link 3</NavLink>
              </ul>
            </Col>
            <Col xs={4}>
              <h5>Column 3</h5>
              <ul className='list-unstyled'>
                <NavLink href='#'>Link 1</NavLink>
                <NavLink href='#'>Link 2</NavLink>
                <NavLink href='#'>Link 3</NavLink>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
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
