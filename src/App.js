import React, { Component } from 'react';
import './App.css';
//Generic Functions
import { handleWindowClose, handleWindowOpen } from "./handlers/windowHandlers.js";
//components
import HomeScreen from "./components/HomeScreen/HomeScreen.js";
import Footer from "./components/Footer/Footer.js";
import Explorer from "./components/Explorer/Explorer.js";
import FileViewer from "./components/FileViewer/FileViewer.js";
import PopupModal from "./components/PopupModal/PopupModal.js";
class App extends Component {
  constructor() {
    super();
    this.state = {
      explorerWindows: {},
      popupModalWindows: {},
      fileViewerWindows: {},
    };
  }
  //handle new windows
  handleExplorerOpen = (e, name, data) => this.setState({ explorerWindows: handleWindowOpen(e, name, data, { ...this.state.explorerWindows }, <Explorer />, { handlePopupModal: this.handlePopupModal, handleFileViewerOpen: this.handleFileViewerOpen, handleExplorerOpen: this.handleExplorerOpen, closeAllExplorers: this.closeAllExplorers, handleClose: this.handleExplorerClose }) });
  handleFileViewerOpen = (e, name, data, type) => this.setState({ fileViewerWindows: handleWindowOpen(e, name, data, { ...this.state.fileViewerWindows }, <FileViewer />, { handleClose: this.handleFileViewerClose, type: type }) });
  handlePopupModal = (e, name, data, question, options) => this.setState({ popupModalWindows: handleWindowOpen(e, name, data, { ...this.state.popupModalWindows }, <PopupModal />, { handleFileViewerOpen: this.handleFileViewerOpen, handleTextDocClick: this.handleTextDocClick, handleClose: this.handlePopupModalClose, options: options, question: question }) });
  //handle closing old windows
  handleExplorerClose = (e, key) => this.setState({ explorerWindows: handleWindowClose(e, key, { ...this.state.explorerWindows }) });
  handleFileViewerClose = (e, key) => this.setState({ fileViewerWindows: handleWindowClose(e, key, { ...this.state.fileViewerWindows }) });
  handlePopupModalClose = (e, key) => this.setState({ popupModalWindows: handleWindowClose(e, key, { ...this.state.popupModalWindows }) });
  closeAllExplorers = () => this.setState({ explorerWindows: {} });
  renderAllWindows = () => {
    return (
      <div>
        {Object.values(this.state.explorerWindows).map(item => item)}
        {Object.values(this.state.fileViewerWindows).map(item => item)}
        {Object.values(this.state.popupModalWindows).map(item => item)}
      </div>
    );
  }
  render() {
    return (
      <div className="App">
        <HomeScreen handleFileViewerOpen={this.handleExplorerOpen} handleExplorerOpen={this.handleExplorerOpen} handlePopupModal={this.handlePopupModal} />
        {this.renderAllWindows()}
        <Footer explorerWindows={this.state.explorerWindows} popupModalWindows={this.state.popupModalWindows} fileViewerWindows={this.state.fileViewerWindows}/>
      </div>
    );
  }
}

export default App;
