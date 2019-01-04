import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { name, price, image, id } = props.product;

  return (
    <div className="Product">
      <img src={image} alt="" />
      <h2>{name}</h2>
      <p>${price}</p>
      <button onClick={() => props.inventoryDelete(id)}>Delete</button>
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}
