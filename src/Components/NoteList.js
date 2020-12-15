import React from 'react';
import APIContext from '../APIContext';
import Note from './Note';
import './NoteList.css';

export default class NoteList extends React.Component {
    static contextType = APIContext;

    render() {
        const { notes } = this.context;
        const notesMap = notes.filter(note =>
            note.folderId === this.props.match.params.folderId || !this.props.match.params.folderId
        )

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
                <button 
                type="button"
                className="addNoteBtn"
                ><b>ADD NOTE</b></button>
            </nav>
        )
    }
}