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
    this.allWindows = []
  }
  componentWillMount() {
    this.handleCacheDump();
  }
  handleCacheDump() {
    const dayToMS = 86400000;
    if (localStorage.getItem("lastDumped") === null || parseInt(localStorage.getItem("lastDumped")) < Date.now() - dayToMS) {
      localStorage.setItem("lastDumped", Date.now());
      window.location.reload(true);
    }
  }
  //handle new windows
  handleExplorerOpen = (e, name, data) => this.setState({ explorerWindows: handleWindowOpen(e, name, data, { ...this.state.explorerWindows }, <Explorer />, { type: "explorer", handlePopupModal: this.handlePopupModal, handleFileViewerOpen: this.handleFileViewerOpen, handleExplorerOpen: this.handleExplorerOpen, closeAllExplorers: this.closeAllExplorers, handleClose: this.handleExplorerClose }) });
  handleFileViewerOpen = (e, name, data, type) => this.setState({ fileViewerWindows: handleWindowOpen(e, name, data, { ...this.state.fileViewerWindows }, <FileViewer />, { handleClose: this.handleFileViewerClose, type: type }) });
  handlePopupModal = (e, name, data, question, options) => this.setState({ popupModalWindows: handleWindowOpen(e, name, data, { ...this.state.popupModalWindows }, <PopupModal />, { handleFileViewerOpen: this.handleFileViewerOpen, handleTextDocClick: this.handleTextDocClick, handleClose: this.handlePopupModalClose, options: options, question: question }) });
  //handle closing old windows
  handleExplorerClose = (e, key) => this.setState({ explorerWindows: handleWindowClose(e, key, { ...this.state.explorerWindows }) });
  handleFileViewerClose = (e, key) => this.setState({ fileViewerWindows: handleWindowClose(e, key, { ...this.state.fileViewerWindows }) });
  handlePopupModalClose = (e, key) => this.setState({ popupModalWindows: handleWindowClose(e, key, { ...this.state.popupModalWindows }) });
  closeAllExplorers = () => this.setState({ explorerWindows: {} });
  renderAllWindows = () => {
    let x = [];
    Object.values(this.state.explorerWindows).map(item => x.push(item));
    Object.values(this.state.fileViewerWindows).map(item => x.push(item));
    Object.values(this.state.popupModalWindows).map(item => x.push(item));
    this.allWindows = x;
    return (
      <div>
        {x}
      </div>
    );
  }
  render() {
    if (window.innerWidth < 500 && Object.keys(this.state.popupModalWindows).length < 1) this.handlePopupModal(null, "Redirect", null, "View mobile version of portfolio?", ["Yes", "No"]);
    return (
      <div className="App">
        <HomeScreen handleFileViewerOpen={this.handleExplorerOpen} handleExplorerOpen={this.handleExplorerOpen} handlePopupModal={this.handlePopupModal} />
        {this.renderAllWindows()}
        <Footer handleExplorerOpen={this.handleExplorerOpen} activeWindows={this.allWindows} />
      </div>
    );
  }
}

export default App;
