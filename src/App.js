import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import DemoHeader from "./components/DemoHeader";
import DemoResultSidebar from "./components/DemoResultSidebar";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import _ from 'lodash';
import "./App.css";

import theme from "./constants/theme";
import Editor from "./components/editor";
import ContentHandler from './contentHandler'

class App extends Component {
  state = {
    title: "",
    text: "",
    sentences: {},
    suggestions: [],
    editing: false,
    displaySidebar: false,
    debounceTimer: new Date()
  };

  _toggleSidebar = (force = null) => {
    const { displaySidebar } = this.state;
    this.setState({ displaySidebar: force !== null ? force : displaySidebar });
  };

  _onChangeText = (newText) => {
    var content = new ContentHandler(newText, this.state.sentences, this.state.suggestions);
    this.setState({ 
      debounceTimer: new Date(),
      text: newText,
      sentences: content.sentences,
      suggestions: content.suggestions 
    });
    this._debouncedQuery(content);
  };

  _debouncedQuery = (content) => {
    const debounceDelay = 1000;
    setTimeout(() => {
      const now = new Date();
      if (now.getTime() - this.state.debounceTimer.getTime() >= debounceDelay) {
        content.query((sentence, results) => {
          this.setState({ 
            sentences: { ...this.state.sentences, sentence: content.SentenceState.DONE },
            suggestions: [ ...this.state.suggestions, ...results],
            displaySidebar: true
          });
        });
      }
    }, debounceDelay);
  };

  _removeSuggestionById = (id) => {
    const suggestions = [];
    this.state.suggestions.forEach((suggestion) => {
      if (suggestion.id != id) suggestions.push({ ...suggestion });
    });
    this.setState({ suggestions, displaySidebar: suggestions.length > 0 });
  };

  _removeSuggestionBySource = (source) => {
    const suggestions = [];
    this.state.suggestions.forEach((suggestion) => {
      if (suggestion.source != source) suggestions.push({ ...suggestion });
    });
    this.setState({ suggestions, displaySidebar: suggestions.length > 0 });
  };

  _onChangeTitle = (newTitle) => {
    this.setState({ title: newTitle });
  };

  _onFocusEditor = (editing) => {
    this.setState({ editing });
  };

  render() {
    const { title, text, editing, suggestions, displaySidebar } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <DemoHeader />
          <Editor 
            setText={this._onChangeText}
            setTitle={this._onChangeTitle}
            setEditorFocus={this._onFocusEditor}
            title={title}
            text={text}
            editing={editing}
          />
          <Footer />
          <DemoResultSidebar 
            displayed={displaySidebar} 
            suggestions={suggestions} 
            removeSuggestion={this._removeSuggestionById}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
