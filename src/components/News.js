import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import { withRouter } from "./withRouter";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], // Initialize as an empty array
      loading: false,
      page: 1,
      totalResults: 0, // Track total results, not total pages
      initialArticles: [], // Store the original articles passed in props
    };
  }

  fetchNews = async () => {
    const { category } = this.props.params; // Read category from URL params
    const pageSize = this.props.pageSize;
    const country = this.props.country;
    const apiKey = this.props.apiKey;
    console.log(apiKey);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    try {
      const response = await fetch(url);
      const data = await response.json();

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...(data.articles || [])], // Append new articles
        loading: false,
        totalResults: data.totalResults, // Update totalResults
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.fetchNews();
    // Initialize the articles from props when the component mounts
    this.setState({
      initialArticles: this.props.articles || [],
    });
  }

  componentDidUpdate(prevProps) {
    // Check if the category has changed
    if (prevProps.params.category !== this.props.params.category) {
      this.setState(
        { page: 1, articles: [], initialArticles: this.props.articles || [] },
        this.fetchNews
      ); // Reset articles and initialize initialArticles
    }
  }

  handlePullDownRefresh = () => {
    this.setState(
      { articles: [...this.state.initialArticles] },
      this.fetchNews
    ); // Reset articles to the original passed in props
  };

  render() {
    if (this.state.loading && this.state.articles.length === 0) {
      return (
        <div className="text-center my-4">
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <h1 className="text-center my-4 ">
            News - {this.props.params.category?.toUpperCase() || "GENERAL"}
          </h1>

          <InfiniteScroll
            dataLength={this.state.articles.length} // Correctly pass the length of articles
            next={() => {
              this.setState(
                (prevState) => ({ page: prevState.page + 1 }),
                this.fetchNews
              );
            }}
            hasMore={this.state.articles.length < this.state.totalResults} // Ensure hasMore is conditionally checked
            loader={
              <div className="text-center my-4">
                <Spinner />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            refreshFunction={this.handlePullDownRefresh} // Use handlePullDownRefresh for restoring the original articles
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          >
            <div className="row">
              {this.state.articles
                .filter(
                  (article) =>
                    article.title !== "[Removed]" &&
                    article.description !== "[Removed]"
                )
                .map((article, index) => (
                  <div className="col-md-4" key={index}>
                    <Newsitem
                      title={article.title}
                      description={article.description}
                      imageUrl={article.urlToImage}
                      newsUrl={article.url}
                    />
                  </div>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default withRouter(News);
