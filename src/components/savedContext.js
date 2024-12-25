import React, { Component, createContext } from "react";

export const SavedContext = createContext();

export class SavedProvider extends Component {
  constructor() {
    super();
    this.state = {
      savedArticles: [],
    };
  }

  saveArticle = (article) => {
    this.setState((prevState) => {
      if (!prevState.savedArticles.find((a) => a.url === article.url)) {
        return { savedArticles: [...prevState.savedArticles, article] };
      }
      return prevState;
    });
  };

  removeArticle = (article) => {
    this.setState((prevState) => ({
      savedArticles: prevState.savedArticles.filter(
        (a) => a.url !== article.url
      ),
    }));
  };

  render() {
    return (
      <SavedContext.Provider
        value={{
          savedArticles: this.state.savedArticles,
          saveArticle: this.saveArticle,
          removeArticle: this.removeArticle,
        }}
      >
        {this.props.children}
      </SavedContext.Provider>
    );
  }
}
