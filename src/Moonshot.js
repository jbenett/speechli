import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

import { documentManager } from "./documentUtils";
import Header from "./components/Header";
import MoonshotSidebar from "./components/MoonshotSidebar";
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

class Moonshot extends Component {
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
    // Do nothing, we're never hiding the sidebar
  };

  _toggleLoader = (displayLoader = false) => {
    this.setState({ displayLoader });
  };

  _onChangeText = newText => {
    this.setState({ text: newText });
    // Do nothing, we have no auto query
  };

  _onButtonPress = () => {
    this._toggleLoader(true);
    const content = new ContentHandler(this.state.text);
    const authors = this.state.selectedAuthorOptions.map(obj => obj.value);
    content.moonshotQuery(authors, sentenceMap => {
      let updatedText = this.state.text;
      for (let oldText of Object.keys(sentenceMap)) {
        updatedText = updatedText.replace(oldText, sentenceMap[oldText].trim());
      }
      this.setState({ text: updatedText });
      // this._toggleLoader(false);
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
    this.setState({ selectedAuthorOptions });
  };

  _onChangeTag = activeTag => {
    this.setState({ activeTag });
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
        <div className="Moonshot App">
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
          <MoonshotSidebar
            displayed={displaySidebar}
            loading={displayLoader}
            onButtonPress={this._onButtonPress}
            authorOptions={authorOptions}
            selectedAuthorOptions={selectedAuthorOptions}
            onChangeAuthors={this._onChangeAuthors}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default Moonshot;
