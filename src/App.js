import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';
import NavBar from './Components/NavBar';
import NoteList from './Components/NoteList';
import NoteView from './Components/NoteView';
import NoteNav from './Components/NoteNav';
import AddFolder from './Components/AddFolder';
import AddNote from './Components/AddNote';
import APIContext from './APIContext';
import ErrorBoundary from './ErrorHandlers/ErrorBoundary';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    };
  }

  componentDidMount() {
    this.getFolderData();
    this.getNoteData();
  }

  getFolderData() {
    fetch(`http://localhost:9090/folders`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Hey, something went wrong')
        }
        return response.json()
      })
      .then(data => {
        this.setState({
          folders: data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getNoteData() {
    fetch(`http://localhost:9090/notes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Hey, something went wrong')
        }
        return response.json()
      })
      .then(data => {
        this.setState({
          notes: data
        })
      })
      .catch(err => {
        alert(err);
      })
  }

  deleteItem = (noteId) => {
    const filterState = this.state.notes.filter(note => {
      return note.id !== noteId;
    })
    this.setState({
      notes: filterState
    })
    console.log(filterState, noteId)
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteItem: this.deleteItem,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
    }

    return (
      <div className="App">
        <APIContext.Provider value={contextValue}>
          <Link to={'/'}>
            <header className="App_header">
              <h1>Noteful</h1>
            </header>
          </Link>

          <main>
            <section className="folderSection">
              {["/", "/folder/:folderId"].map(path => (
                <Route
                  exact key={path}
                  path={path}
                  component={NavBar}
                />
              ))}
              <Route
                exact path="/note/:noteId"
                component={NoteNav}
              />
            </section>

            <section className="noteSection">
              <ErrorBoundary>
                {["/", "/folder/:folderId"].map(path => (
                  <Route
                    exact key={path}
                    path={path}
                    component={NoteList}
                  />
                ))}
              </ErrorBoundary>
              <ErrorBoundary>
                <Route
                  exact path="/note/:noteId"
                  component={NoteView}
                />
              </ErrorBoundary>
              <Route
                path='/add-folder'
                component={AddFolder}
              />
              <Route
                path='/add-note'
                component={AddNote}
              />
            </section>
          </main>
        </APIContext.Provider>
      </div>
    );
  }
}