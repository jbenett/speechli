import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import "semantic-ui-css/semantic.min.css";

import Header from "./components/Header";
import ResultSidebar from "./components/ResultSidebar";
import Footer from "./components/Footer";
import Editor from "./components/Editor";

import "./App.css";
import theme from "./constants/theme";
import ContentHandler from './ContentHandler'

class App extends Component {
  state = {
    title: "",
    text: "",
    highlighted: "",
    sentences: {},
    suggestions: [],
    editing: false,
    displaySidebar: false,
    displayLoader: false,
    debounceTimer: new Date()
  };

  _toggleSidebar = (force = null) => {
    const { displaySidebar } = this.state;
    this.setState({ displaySidebar: force !== null ? force : displaySidebar });
  };

  _toggleLoader = (displayLoader = false) => {
    this.setState({ displayLoader });
  };

  _onChangeText = (newText) => {
    const content = new ContentHandler(newText, this.state.sentences, this.state.suggestions);
    this.setState({ 
      debounceTimer: new Date(),
      text: newText,
      sentences: content.sentences,
      suggestions: content.suggestions,
      displaySidebar: content.suggestions.length > 0
    });
    this._debouncedQuery(content);
  };

  _debouncedQuery = (content) => {
    const debounceDelay = 1000;
    setTimeout(() => {
      const now = new Date();
      if (now.getTime() - this.state.debounceTimer.getTime() >= debounceDelay) {
        this._toggleLoader(true);
        content.query((sentence, results) => {
          // Currently its possible to query for the same sentence twice if the request takes 
          // longer to return than the debounce timeout. The following line is a hacky way to 
          // ignore the repeated suggestions, but does still make the suggestions
          if (this.state.sentences[sentence] == content.SentenceState.DONE) return;
          const updatedSentences = { ...this.state.sentences };
          updatedSentences[sentence] = content.SentenceState.DONE;
          this.setState({ 
            sentences: updatedSentences,
            suggestions: [ ...this.state.suggestions, ...results],
            displaySidebar: true
          });
          this._toggleLoader(false);
        });
      }
    }, debounceDelay);
  };

  _removeSuggestion = (id) => {
    const suggestion = this.state.suggestions.find((sug) => sug.id == id);
    const content = new ContentHandler(this.state.text, this.state.sentences, this.state.suggestions);
    content.markSentenceAsDone(suggestion.source);
    content.removeSuggestionById(id);
    this.setState({ 
      suggestions: content.suggestions, 
      displaySidebar: content.suggestions.length > 0, 
      highlighted: ''
    });
  };

  _takeSuggestion = (id) => {
    let newText = this.state.text;
    const suggestion = this.state.suggestions.find((sug) => sug.id == id);
    if (suggestion) { 
      newText = newText.replace(suggestion.source, suggestion.text); // Currently only replaces one occurrence 
    }
    const content = new ContentHandler(newText, this.state.sentences, this.state.suggestions);
    content.markSentenceAsDone(suggestion.text);
    content.removeSuggestionBySource(suggestion.text);
    this.setState({ 
      text: newText,
      sentences: content.sentences,
      suggestions: content.suggestions,
      displaySidebar: content.suggestions.length > 0
    });
  };

  _onHoverSuggestion = ( text='') => {
    this.setState({ highlighted: text });
  };

  _onChangeTitle = (newTitle) => {
    this.setState({ title: newTitle });
  };

  _onFocusEditor = (editing) => {
    this.setState({ editing });
  };

  render() {
    const { title, text, editing, suggestions, displaySidebar, displayLoader } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Editor 
            setText={this._onChangeText}
            setTitle={this._onChangeTitle}
            setEditorFocus={this._onFocusEditor}
            title={title}
            text={text}
            highlighted={this.state.highlighted}
            editing={editing}
          />
          <Footer />
          <div
            className={displayLoader ? "loader hug-sidebar" : "hug-sidebar"}
            style={{
              top: "calc(-100% + 25px)",
              right: "calc(-100% + 30px)"
            }}
          />
          <ResultSidebar 
            displayed={displaySidebar} 
            loading={displayLoader}
            suggestions={suggestions} 
            removeSuggestion={this._removeSuggestion}
            takeSuggestion={this._takeSuggestion}
            onHoverSuggestion={this._onHoverSuggestion}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
