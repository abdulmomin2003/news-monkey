import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SavedContext } from "./savedContext";

export class Navbar extends Component {
  static contextType = SavedContext;

  render() {
    const { savedArticles } = this.context; // Get saved articles from context
    const categories = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-black   fixed-top mb-2 border border-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              News Monkey
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Center Categories */}
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                {categories.map((category) => (
                  <li className="nav-item" key={category}>
                    <Link className="nav-link" to={`/${category}`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Saved Link Aligned to the End */}
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      savedArticles.length === 0 ? "disabled" : ""
                    }`}
                    to="/saved"
                  >
                    Saved
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
