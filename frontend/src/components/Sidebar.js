import React, { useState, useEffect } from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isSidebarVisible, handleSidebarToggle }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Offcanvas show={isSidebarVisible} onHide={handleSidebarToggle}>
      <div className="sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/products/category/${category._id}`}
                onClick={handleSidebarToggle}
              >
                <ListGroup.Item action>{category.name}</ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </div>
    </Offcanvas>
  );
};

export default Sidebar;
