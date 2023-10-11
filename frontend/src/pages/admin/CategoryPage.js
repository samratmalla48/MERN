import { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../slices/categoriesSlice";
import { toast } from "react-toastify";

function CategoryPage({ onAddCategory }) {
  const [name, setCategoryName] = useState("");
 



  const {
    data: categories,
    refetch,
    isLoading,
    error,
  } = useGetCategoriesQuery();

  const [createCategory] =
    useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ter");
    try {
      const res = await createCategory({ name }).unwrap();
      console.log(res.message);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [deleteCategory] =
    useDeleteCategoryMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteCategory(id);
        toast.success("Deleted Successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Categories</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(category._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default CategoryPage;
