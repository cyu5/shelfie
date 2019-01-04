import React from "react";
import Product from "../Product/Product";
import axios from "axios";
import "./Dashboard.css";
import { connect } from "react-redux";
import { inventoryUpdate } from "../../reducer";

class Dashboard extends React.Component {
  componentDidMount = () => {
    this.inventoryGet();
  };

  inventoryGet = () => {
    axios.get("/api/inventory").then(res => {
      const inventory = res.data;
      this.props.inventoryUpdate(inventory);
    });
  };

  inventoryDelete = id => {
    axios.delete(`/api/product/${id}`).then(res => {
      this.inventoryGet();
    });
  };

  render() {
    console.log(`Dashboard renders. props: `, this.props);
    const { inventory } = this.props;
    const inventoryMapped = inventory.map(product => {
      return (
        <Product
          key={product.id}
          product={product}
          inventoryDelete={this.inventoryDelete}
        />
      );
    });
    return <div className="Dashboard">{inventoryMapped}</div>;
  }
}

function mapStateToProps(state) {
  const { inventory } = state;
  return { inventory };
}

const mapDispatchToProps = { inventoryUpdate };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
