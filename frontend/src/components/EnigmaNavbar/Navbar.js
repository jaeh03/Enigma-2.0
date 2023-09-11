import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { MenuItems } from "./MenuItems";
import { Button } from "./Button";
import "./Navbar.css";

class EnigmaNavbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <nav className="nav-bar inter-semi-bold-black-32px">
        <h1 className="navbar-logo">
          Enigma AI<i className="fab fa-react"></i>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <div>
          <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}
export default EnigmaNavbar;
