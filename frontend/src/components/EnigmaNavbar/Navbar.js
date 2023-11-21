import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import {faFileWaveform} from '@fortawesome/free-solid-svg-icons';
import { Nav } from "react-bootstrap";
import { MenuItems } from "./MenuItems";
import imgLogo from "../../images/Logo.png";
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
        <a className="navbar-logo" href="/">
          <img className="logo-image" src={imgLogo} alt="Logo" />
          {/* <h1 className="navbar-title">
            Enigma TLDV
          </h1> */}
        </a>
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
