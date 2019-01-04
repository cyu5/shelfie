import React from "react";
import axios from "axios";
import "./Form.css";
import { Link } from "react-router-dom";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      image: "",
      id: null
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    if (id) {
      this.productGet(id);
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps === this.props) return;
    if (!this.props.match.params.id) {
      this.setState({
        name: "",
        price: 0,
        image: "",
        id: null
      });
    }
  };

  productGet(id) {
    axios.get(`/api/product/${id}`).then(res => {
      const product = res.data;
      const { name, price, image, id } = product;
      console.log(`Form requested product of id: ${id} from server`);
      console.log(product);

      this.setState({
        name,
        price,
        image,
        id
      });
    });
  }

  nameChangeHandler = name => {
    this.setState({
      name
    });
  };
  priceChangeHandler = price => {
    this.setState({
      price
    });
  };
  imageChangeHandler = image => {
    this.setState({
      image
    });
  };

  cancelHandler = () => {
    this.setState({
      image: "",
      name: "",
      price: ""
    });
  };

  submitHandler = () => {
    const { name, price, image } = this.state;
    const product = { name, price, image };

    // Post to inventory
    axios.post("api/product", product).then(res => {
      // Refresh inventory
      this.props.inventoryGet();
      this.cancelHandler();
    });
  };

  saveChanges = () => {
    const { id, image, name, price } = this.state;
    axios.put(`api/product/${id}`, { image, name, price }).then(res => {
      // Refresh inventory
      this.props.inventoryGet();
      this.cancelHandler();
    });
  };

  render() {
    const { image, name, price, id } = this.state;
    const editOrAdd = id ? (
      <button onClick={this.saveChanges}>Save Changes</button>
    ) : (
      <button onClick={this.submitHandler}>Add to Inventory</button>
    );
    return (
      <div className="Form">
        <img src={image} alt="" />

        <p>Image URL: </p>
        <input
          type="text"
          value={image}
          onChange={e => this.imageChangeHandler(e.target.value)}
        />
        <p>Product Name: </p>
        <input
          type="text"
          value={name}
          onChange={e => this.nameChangeHandler(e.target.value)}
        />
        <p>Price: </p>
        <input
          type="text"
          value={price}
          onChange={e => this.priceChangeHandler(e.target.value)}
        />

        <br />
        <div className="form-btn-container">
          <button onClick={this.cancelHandler}>Cancel</button>
          {/* <button onClick={this.submitHandler}>Add to Inventory</button> */}
          <Link to="/">{editOrAdd}</Link>
        </div>
      </div>
    );
  }
}
