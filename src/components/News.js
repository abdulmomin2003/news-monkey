import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], // Articles to render
      loading: false, // Loading state
    };
  }

  truncateDescription = (description) => {
    return description.length > 100
      ? description.slice(0, 100) + "..."
      : description;
  };

  async componentDidMount() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Use .env API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6ad4c752c9f5462b981c77d7fb161901`;

    this.setState({ loading: true }); // Set loading to true before fetching
    try {
      let response = await fetch(url);
      let data = await response.json();

      this.setState({
        articles: data.articles || [], // Safely set articles
        loading: false, // Set loading to false after fetch
      });
    } catch (error) {
      console.error("Error fetching news data:", error);
      this.setState({ loading: false }); // Handle errors gracefully
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="text-center my-4">News</h1>
          {this.state.loading && <h3 className="text-center">Loading...</h3>}
          <div className="row">
            {this.state.articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <Newsitem
                  title={article.title}
                  description={this.truncateDescription(
                    article.description || ""
                  )}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default News;
