import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

import { documentManager } from "./documentUtils";
import Header from "./components/Header";
import ResultSidebar from "./components/ResultSidebar";
import Footer from "./components/Footer";
import Editor from "./components/Editor";

import "./App.css";
import theme from "./constants/theme";
import ContentHandler from "./ContentHandler";

const TAG_BUTTON_VALUES = [
  { value: "lyrics", props: { emoji: "👩‍🎤", text: "Song", color: "#ff1f79" } },
  { value: "book", props: { emoji: "📚", text: "Story", color: "#4858f3" } },
  { value: "quote", props: { emoji: "👨‍⚖️", text: "Speech", color: "#eddc22" } }
];

class App extends Component {
  state = {
    title: "",
    text: "",
    highlighted: "",
    sentences: {},
    suggestions: [],
    editing: false,
    displaySidebar: true,
    displayLoader: false,
    debounceTimer: new Date(),
    authorOptions: [],
    selectedAuthorOptions: [],
    activeTag: "quote"
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/discovery/authors/")
      .then(response => {
        response.data.sort();
        this.setState({
          authorOptions: response.data.map(val => {
            return { label: val, value: val };
          })
        });
      })
      .catch(error => {
        console.log(
          "Authors query did not work, will not render that component"
        );
      });
  }

  _toggleSidebar = (force = null) => {
    const { displaySidebar } = this.state;
    this.setState({ displaySidebar: force !== null ? force : displaySidebar });
  };

  _toggleLoader = (displayLoader = false) => {
    this.setState({ displayLoader });
  };

  _onChangeText = newText => {
    const content = new ContentHandler(
      newText,
      this.state.sentences,
      this.state.suggestions
    );
    this.setState({
      debounceTimer: new Date(),
      text: newText,
      sentences: content.sentences,
      suggestions: content.suggestions,
      displaySidebar: content.suggestions.length > 0
    });
    if (content) {
      this._debouncedQuery(content);
    }
  };

  _debouncedQuery = content => {
    const debounceDelay = 1000;
    setTimeout(() => {
      const now = new Date();
      if (now.getTime() - this.state.debounceTimer.getTime() >= debounceDelay) {
        this._toggleLoader(true);
        const authors = this.state.selectedAuthorOptions.map(obj => obj.value);
        content.query(this.state.activeTag, authors, (sentence, results) => {
          // Currently its possible to query for the same sentence twice if the request takes
          // longer to return than the debounce timeout. The following line is a hacky way to
          // ignore the repeated suggestions, but does still make the suggestions
          if (this.state.sentences[sentence] == content.SentenceState.DONE)
            return;
          const updatedSentences = { ...this.state.sentences };
          updatedSentences[sentence] = content.SentenceState.DONE;
          this.setState({
            sentences: updatedSentences,
            suggestions: [...this.state.suggestions, ...results],
            displaySidebar: true
          });
          this._toggleLoader(false);
        });
      }
    }, debounceDelay);
  };

  _removeSuggestion = id => {
    const suggestion = this.state.suggestions.find(sug => sug.id == id);
    const content = new ContentHandler(
      this.state.text,
      this.state.sentences,
      this.state.suggestions
    );
    content.markSentenceAsDone(suggestion.source);
    content.removeSuggestionById(id);
    this.setState({
      suggestions: content.suggestions,
      displaySidebar: content.suggestions.length > 0,
      highlighted: ""
    });
  };

  _takeSuggestion = id => {
    let newText = this.state.text;
    const suggestion = this.state.suggestions.find(sug => sug.id == id);
    if (suggestion) {
      newText = newText.replace(suggestion.source, suggestion.text.trim()); // Currently only replaces one occurrence
    }
    const content = new ContentHandler(
      newText,
      this.state.sentences,
      this.state.suggestions
    );
    content.markSentenceAsDone(suggestion.text);
    content.removeSuggestionBySource(suggestion.text);
    this.setState({
      text: newText,
      sentences: content.sentences,
      suggestions: content.suggestions,
      displaySidebar: content.suggestions.length > 0
    });
  };

  _onHoverSuggestion = (text = "") => {
    this.setState({ highlighted: text });
  };

  _onChangeTitle = newTitle => {
    this.setState({ title: newTitle });
  };

  _onFocusEditor = editing => {
    this.setState({ editing });
  };

  _onChangeAuthors = selectedAuthorOptions => {
    const content = new ContentHandler(
      this.state.text,
      this.state.sentences,
      this.state.suggestions
    );
    content.hardResetSuggestions();
    this.setState(
      { 
        selectedAuthorOptions, 
        sentences: content.sentences,
        suggestions: content.suggestions,
        displaySidebar: content.suggestions.length > 0 
      }, () => {
        this._debouncedQuery(content);
      }
    );
  };

  _onChangeTag = activeTag => {
    const content = new ContentHandler(
      this.state.text,
      this.state.sentences,
      this.state.suggestions
    );
    content.hardResetSuggestions();
    this.setState(
      { 
        activeTag, 
        sentences: content.sentences,
        suggestions: content.suggestions,
        displaySidebar: content.suggestions.length > 0 
      }, () => {
        this._debouncedQuery(content);
      }
    );
  };

  _onChangeDocument = ({ title, text }) => {
    this.setState({ title, text });
  };

  _onSaveDocument = () => {
    const { title, text } = this.state;
    documentManager.storeDocument({ title, text });
  };

  render() {
    const {
      title,
      text,
      editing,
      suggestions,
      displaySidebar,
      displayLoader,
      authorOptions,
      selectedAuthorOptions,
      activeTag
    } = this.state;

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
            activeTag={activeTag}
            tagButtonValues={TAG_BUTTON_VALUES}
            onTagChange={this._onChangeTag}
          />
          <Footer
            onSaveDocument={this._onSaveDocument}
            onChangeDocument={this._onChangeDocument}
          />
          <div
            className={displayLoader ? "loader hug-sidebar" : "hug-sidebar"}
            style={{
              top: "calc(-100% + 50px)",
              right: "calc(-100% + 60px)"
            }}
          />
          <ResultSidebar
            displayed={displaySidebar}
            loading={displayLoader}
            suggestions={suggestions}
            removeSuggestion={this._removeSuggestion}
            takeSuggestion={this._takeSuggestion}
            onHoverSuggestion={this._onHoverSuggestion}
            authorOptions={authorOptions}
            selectedAuthorOptions={selectedAuthorOptions}
            onChangeAuthors={this._onChangeAuthors}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
