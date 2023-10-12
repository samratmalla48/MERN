import { Container, Row, Col, NavLink } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-white">
      <Container fluid className="footer text-white">
        <Container>
          <Row>
            <Col xs={4}>
              <h5>Column 1</h5>
              <ul className="list-unstyled">
                <NavLink href="#">FAQ</NavLink>
                <NavLink href="#">About Us</NavLink>
                <NavLink href="#">Terms of Services</NavLink>
              </ul>
            </Col>
            <Col xs={4}>
              <h5>Column 2</h5>
              <ul className="list-unstyled">
                <NavLink href="#">Privacy Policy</NavLink>
                <NavLink href="#">Careers</NavLink>
                <NavLink href="#">Shipping and Dev</NavLink>
              </ul>
            </Col>
            <Col xs={4}>
              <h5>Column 3</h5>
              <ul className="list-unstyled">
                <NavLink href="https://www.facebook.com/itsnewcastleautospareparts/">
                  Facebook
                </NavLink>
                <NavLink href="https://www.instagram.com/itsnewcastleautospareparts/">
                  Instagram
                </NavLink>
                <NavLink href="https://www.twitter.com/newcastleasp/">
                  Twitter
                </NavLink>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
      <div className="text-center footer-bottom py-3">
        Newcastle Auto Spare Parts Pty Ltd &copy; {currentYear}
      </div>
    </footer>
  );
};

export default Footer;
