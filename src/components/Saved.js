import React, { Component } from "react";
import { SavedContext } from "./savedContext";
import NewsItem from "./Newsitem";

class Saved extends Component {
  static contextType = SavedContext;

  render() {
    const { savedArticles, removeArticle } = this.context;

    return (
      <div className="container">
        <h1 className="text-center my-4">Saved News</h1>
        <div className="row">
          {savedArticles.length > 0 ? (
            savedArticles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.imageUrl}
                  newsUrl={article.newsUrl}
                />
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => removeArticle(article)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">No saved articles.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Saved;
