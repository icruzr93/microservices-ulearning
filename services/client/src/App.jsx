import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import UserStatus from "./components/UserStatus";
import About from "./components/About";
import Form from "./components/Form";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      title: "TestDriven.io",
      isAuthenticated: false
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    if (window.localStorage.getItem("authToken")) {
      this.setState({ isAuthenticated: true });
    }
  }

  getUsers() {
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
      .then(res => {
        this.setState({ users: res.data.data.users });
      })
      .catch(err => {});
  }

  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  }

  loginUser(token) {
    window.localStorage.setItem("authToken", token);
    this.setState({ isAuthenticated: true });
    this.getUsers();
  }

  render() {
    return (
      <div>
        <NavBar
          title={this.state.title}
          isAuthenticated={this.state.isAuthenticated}
        />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <UsersList users={this.state.users} />}
                  />
                  <Route exact path="/about" component={About} />
                  <Route
                    exact
                    path="/register"
                    render={() => (
                      <Form
                        formType={"Register"}
                        isAuthenticated={this.state.isAuthenticated}
                        loginUser={this.loginUser}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={() => (
                      <Form
                        formType={"Login"}
                        isAuthenticated={this.state.isAuthenticated}
                        loginUser={this.loginUser}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/logout"
                    render={() => (
                      <Logout
                        logoutUser={this.logoutUser}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/status"
                    render={() => (
                      <UserStatus
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
