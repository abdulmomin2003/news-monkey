import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl } = this.props;
    // Placeholder image for missing images
    const placeholderImage = "https://via.placeholder.com/150";
    return (
      <div className="card my-3" style={{ width: "18rem" }}>
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
          <a
            href={newsUrl}
            className="btn btn-sm btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default Newsitem;
