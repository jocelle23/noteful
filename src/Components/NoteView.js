import React from 'react';
import APIContext from '../APIContext';
import SingleNote from './SingleNote';

export default class NoteView extends React.Component {
    static contextType = APIContext;

    handleDeleteNote = () => {
        this.props.history.push('/')
    }

    render() {
        const note = this.context.notes.find(note =>
            note.id === this.props.match.params.noteId
        ) || {}
        return (
            <SingleNote
                key={note.id}
                id={note.id}
                name={note.name}
                folderId={note.folderId}
                content={note.content}
                onDeleteNote={this.handleDeleteNote}
            />
        )
    }
}
