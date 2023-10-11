import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams} from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import CreateProductPage from "./CreateProductPage";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const { pageNumber } = useParams();
  const { categoryId } = useParams();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    pageNumber,
    categoryId,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Define the current page and the number of products to display per page.
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const productsPerPage = 10;

  useEffect(() => {
    // When the page number changes, update the current page.
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [pageNumber]);

  // Check if products is undefined before slicing it.
  const productsToDisplay = products
    ? products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )
    : [];
  const [showCreatePage, setShowCreatePage] = useState(false);

  const createProductHandler = () => {
    setShowCreatePage(true);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(
    (products ? products.length : 0) / productsPerPage
  );

  // Create an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {showCreatePage ? (
        <CreateProductPage
          onCancel={() => setShowCreatePage(false)}
          onSuccess={() => {
            setShowCreatePage(false);
            refetch();
          }}
        />
      ) : (
        <>
          <Row className="align-items-center">
            <Col>
              <h1>Products</h1>
            </Col>
            <Col className="text-end">
              <LinkContainer to={`/admin/product/create`}>
                <Button className="my-3" onClick={createProductHandler}>
                  <FaPlus /> Create Product
                </Button>
              </LinkContainer>
            </Col>
          </Row>
          {loadingDelete && <Loader />}
          {loadingDelete && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error.data.message}</Message>
          ) : (
            <>
              <Table striped bordered hover responsive className="table-sm">
                {/* Table content remains the same */}{" "}
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>Stock</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {productsToDisplay.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category?.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.countInStock}</td>
                      <td>
                       
                        <LinkContainer
                          to={{
                            pathname: `/admin/product/${product._id}/edit`,
                            search: `?categoryId=${product.category}`,
                          }}
                        >
                          <Button variant="light" className="btn-sm mx-2">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <FaTrash style={{ color: "white" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {pageNumbers.map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={page === currentPage ? "primary" : "light"}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
           
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductListPage;
