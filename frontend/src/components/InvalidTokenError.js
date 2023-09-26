import React from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";

const InvalidTokenError = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <Alert variant="danger">
            <h1 className="mb-4">Invalid Verification Token</h1>
            <p className="mb-3">
              The verification token is invalid or has expired.
            </p>
            <p className="mb-3">Please contact support or try again later.</p>
            {/* You can add a button or link to redirect the user to another page */}
            <Button variant="primary" href="/login">
              Back to Login
            </Button>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default InvalidTokenError;
