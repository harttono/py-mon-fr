import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useGlobalContext } from "../context/Context";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  const { userData, logout, gmail } = useGlobalContext();
  const login = () => history.push("/login");
  const register = () => history.push("/register");
  useEffect(() => {}, [userData]);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/" className="text-decoration-none">
                <a class="nav-link">Poke-Mon List</a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/about" className="text-decoration-none">
                <a class="nav-link">About</a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/my-listpoce" className="text-decoration-none">
                <a class="nav-link">My List Pocemon</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
