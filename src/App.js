import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          {/* how to pass arg */}
          <Route exact path="/" component={Dashboard} />
          <Route path="/add" component={Form} />
          <Route path="/edit/:id" component={Form} />
        </Switch>
      </div>
    );
  }
}

export default App;
