import React from 'react';
import APIContext from '../APIContext';
import Note from './Note';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NoteList.css';

export default class NoteList extends React.Component {
    state = {
        forErrors: this.props.match,
        toggle: true
    }

    static contextType = APIContext;

    render() {
        const { notes } = this.context;
        const notesMap = notes.filter(note =>
            note.folderId === this.state.forErrors.params.folderId || !this.state.forErrors.params.folderId
        )
        if (this.state.toggle === false) {
            this.setState({
                forErrors: 'Error'
            })
            this.setState({
                forErrors: this.props.match
            })
        }

        return (
            <nav>
                <ul>
                    {notesMap.map(note =>
                        <Note
                            key={note.id}
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                            folderId={note.folderId}
                            content={note.content}
                        />
                    )}
                </ul>
                <Link to='/add-note'>
                    <b className="addNoteBtn">ADD NOTE</b>
                </Link>
            </nav>
        )
    }
}


NoteList.propType = {
    match: PropTypes.object.isRequired,
    params: PropTypes.array.isRequired,
    folderId: PropTypes.array.isRequired
};