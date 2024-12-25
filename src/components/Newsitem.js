import React, { Component } from "react";
import { SavedContext } from "./savedContext";

export class Newsitem extends Component {
  static contextType = SavedContext;

  constructor() {
    super();
    this.state = {
      showSuccess: false, // State to handle popup visibility
    };
  }

  handleSave = (article) => {
    const { saveArticle } = this.context;
    saveArticle(article); // Save the article
    this.setState({ showSuccess: true }); // Show the success message

    // Hide the popup after 3 seconds
    setTimeout(() => {
      this.setState({ showSuccess: false });
    }, 3000);
  };

  render() {
    const { title, description, imageUrl, newsUrl } = this.props;
    const article = { title, description, imageUrl, newsUrl };

    // Placeholder image for missing images
    const placeholderImage = "https://via.placeholder.com/150";

    return (
      <div className="card my-3">
        <img
          src={imageUrl ? imageUrl : placeholderImage}
          className="card-img-top"
          alt="News Thumbnail"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <div
          className="card-body"
          style={{
            height: "200px", // Set a consistent height for the card body
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h5
            className="card-title"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h5>
          <p
            className="card-text"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description ? description : "No description available."}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <a
              href={newsUrl}
              className="btn btn-sm btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
            <button
              className="btn btn-sm btn-success"
              onClick={() => this.handleSave(article)}
            >
              Save
            </button>
          </div>
        </div>
        {this.state.showSuccess && (
          <div
            className="alert alert-success mt-3"
            style={{ position: "absolute", bottom: "10px", right: "10px" }}
          >
            Article saved successfully!
          </div>
        )}
      </div>
    );
  }
}

export default Newsitem;
