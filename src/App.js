import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';
import dummyStore from './dummy-store';
import NavBar from './Components/NavBar';
import NoteList from './Components/NoteList';
import NoteView from './Components/NoteView';
import NoteReturn from './Components/NoteReturn';

export default class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  componentDidMount() {
    this.setState(dummyStore)
  }

  render() {
    return (
      <div>
        <Link to={'/'}>
          <header>
            <h1>Noteful</h1>
          </header>
        </Link>

        <main>
          <aside>
            <Route
              exact path="/"
              render={() =>
                <NavBar
                  folders={this.state.folders}
                  notes={this.state.notes}
                />
              }
            />

            <Route
            exact path="/folder/:folderId"
            render={() =>
              <NavBar
              folders={this.state.folders}
              notes={this.state.notes}
            />
            }
            />
            
            <Route
            exact path="/note/:noteId"
            render={(routerProps) =>
              <NoteReturn
              folders = {this.state.folders}
              notes = {this.state.notes}
              noteId = {routerProps.match.params.noteId}
            />
            }
            />
          </aside>

          <section>
            <Route
              exact path="/"
              render={() =>
                <NoteList
                  notes={this.state.notes}
                />
              }
            />
            <Route
            exact path="/folder/:folderId"
            render={(routerProps) =>
              <NoteList
              notes={this.state.notes.filter(note =>
                note.folderId === routerProps.match.params.folderId 
                )}
            />
            }
            />
             <Route
            exact path="/note/:noteId"
            render={(routerProps) =>
              <NoteView
              note={this.state.notes.find(note =>
                note.id === routerProps.match.params.noteId
                )}
              />
            }
            />
          </section>
        </main>
      </div>
    );
  }
}