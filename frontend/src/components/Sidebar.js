import React from "react";
import { Offcanvas, Button } from "react-bootstrap";

const Sidebar = ({ isSidebarVisible, handleSidebarToggle }) => {
  return (
    <Offcanvas show={isSidebarVisible} onHide={handleSidebarToggle}>
      <Offcanvas.Header>
        <Offcanvas.Title>Sidebar</Offcanvas.Title>
        <Button variant="close" onClick={handleSidebarToggle} />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>Sidebar content</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;