import React, { useState, useEffect } from "react";
import { message, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios";

function ProductAddScreen({ match, history }) {
  const productId = match.params.id;

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  //   const [image, setImage] = useState("");
  const [category, setCategory] = useState(1);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/categories/")
        .then((res) => {
          const categories = res.data;
          setCategories(categories);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/products/" + productId)
        .then((res) => {
          const product = res.data;
          setName(product.name);
          setPrice(product.price);
          setStock(product.stock);
          setCategory(product.category);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      category: category,
      price: price,
      stock: stock,
    };

    axios
      .post("http://localhost:5000/products/update/" + productId, product)
      .then(message.success("Updated"))
      .catch(function (error) {
        console.log(error);
      });

    history.push("/");
    history.go();
  };

  return (
    <FormContainer>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Product</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <h1>Edit {name}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countinstock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {categories.map((cat) => (
              <option value={cat._id}>{cat.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          {productId === "new" ? "Save" : "Update"}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ProductAddScreen;
