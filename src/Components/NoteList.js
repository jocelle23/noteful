import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteList(props) {
    return (
        <nav>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                    </li>
                )}
            </ul>
            <button type="button">Add Note</button>
        </nav>
    )
}