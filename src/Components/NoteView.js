import React from 'react';
import APIContext from '../APIContext';
import PropTypes from 'prop-types';
import SingleNote from './SingleNote';

export default class NoteView extends React.Component {
    state = {
        forErrors: this.props.match,
        toggle: true
    }

    static contextType = APIContext;

    handleDeleteNote = () => {
        this.props.history.push('/')
    }

    render() {
        const note = this.context.notes.find(note =>
            note.id === this.state.forErrors.params.noteId
        ) || {}
        if (this.state.toggle === false) {
            this.setState({
                forErrors: 'Error'
            })
            this.setState({
                forErrors: this.props.match
            })
        }

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

NoteView.propType = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    params: PropTypes.array.isRequired,
    noteId: PropTypes.string.isRequired
};