import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import axios from "axios";

function ProductAddScreen({ match, history }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState('605c59ece62e8311bbba9e45');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/categories/")
        .then((res) => {
          const categories = res.data;
          setCategories(categories);
          setCategory(categories[0]);
          console.log(category)
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    console.log(formData);

    axios
      .post("http://localhost:5000/products/add", formData)
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      });

    history.push({
      pathname: "/",
      state: { refresh: true },
    });
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
      <h1>Add Product</h1>
      <Form onSubmit={submitHandler} encType="multipart/form-data">
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

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Selected image"
            value={image.name}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>

          <Form.File
            id="image-file"
            label="Choose File"
            custom
            onChange={handleImageChange}
          ></Form.File>
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
          >
            {categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Save
        </Button>
      </Form>
      {/* )} */}
    </FormContainer>
  );
}

export default ProductAddScreen;
