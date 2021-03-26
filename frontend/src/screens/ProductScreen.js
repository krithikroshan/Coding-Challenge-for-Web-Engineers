import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const { confirm } = Modal;

function ProductsScreen() {
  let history = useHistory();

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/products/")
      .then((res) => {
        var products = res.data;
        products.map((item) => item["key"] = item._id);
        setData([...products]);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/categories/")
      .then((res) => {
        const categories = res.data;
        setCategories(categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [history]);

  const columns = [
    {
      title: "Image",
      width: "100px",
      dataIndex: "image",
      key: "name",
      render: (text, record) => (
        <div>
          <img
            alt={record.name}
            src={`/images/${record.image}`}
            style={{ maxWidth: "100px" }}
          ></img>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      key: "name",
      render: (text, record) => (
        <div>
          <Link
            to={{
              pathname: `/product/${record._id}`,
              state: {
                product: record,
              },
            }}
          >
            {record.name}
          </Link>
        </div>
      ),
    },
    {
      title: "Inventory",
      dataIndex: "stock",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: [
        {
          text: "Originals",
          value: '605c59ece62e8311bbba9e45',
        },
        {
          text: 'XXRAY Universe',
          value: '605c5a0ee62e8311bbba9e46',
        },
        {
          text: 'Lifestyle Collections',
          value: '605c5a28e62e8311bbba9e47',
        },
      ],
      key: "category",
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      render: (text, record) => (
        <div>
          {categories.map((item) => {
            if (item._id === record.category) {
              return item.name;
            }
            return null
          })}
        </div>
      ),
    },
  ];

  const onSelectChange = (selected) => {
    const newValues = [...selected];
    setSelected(newValues);
  };

  const rowSelection = {
    selected,
    onChange: onSelectChange,
  };

  const deleteSelected = () => {
    axios
      .post("http://localhost:5000/products/delete", selected)
      .then((res) => {
        setSelected([]);
        fetchData();
        message.success('Deleted');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function showDeleteConfirm() {
    confirm({
      title: "Are you sure delete the selected products?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteSelected();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const hasSelected = selected.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          danger
          onClick={showDeleteConfirm}
          disabled={!hasSelected}
        >
          Delete
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selected.length} items` : ""}
        </span>

        <Link to={{ pathname: "products/new" }}>
          <Button type="primary" style={{ float: "right" }}>
            Add New
          </Button>
        </Link>
      </div>
      <Table rowSelection={rowSelection} dataSource={data} columns={columns} />
    </div>
  );
}

export default ProductsScreen;
