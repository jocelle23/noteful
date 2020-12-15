import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';
import NavBar from './Components/NavBar';
import NoteList from './Components/NoteList';
import NoteView from './Components/NoteView';
import NoteNav from './Components/NoteNav';
import APIContext from './APIContext';

export default class App extends Component {
  state = {
    notes: [],
    folders: []
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
      return note.id === noteId;
    })
    this.setState({
      notes: filterState
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteItem: this.deleteItem
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
              <aside>
                <Route
                  exact path="/"
                  component={NavBar}
                />
                <Route
                  exact path="/folder/:folderId"
                  component={NavBar}
                />
                <Route
                  exact path="/note/:noteId"
                  component={NoteNav}
                />
              </aside>
            </section>

            <section className="noteSection">
              <Route
                exact path="/"
                component={NoteList}
              />
              <Route
                exact path="/folder/:folderId"
                component={NoteList}
              />
              <Route
                exact path="/note/:noteId"
                component={NoteView}
              />
            </section>
          </main>
        </APIContext.Provider>
      </div>
    );
  }
}