import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteReturn(props) {
    console.log(props.noteId)
    const idForNote = props.notes.filter(note => props.notes.id === props.noteId)
    console.log(idForNote)
        
    return (
        <div>
            <button type="button">
                <Link to='/'>
                    Go Back
                </Link>
            </button>

            <h2>
                
            </h2>

        </div>
    )
}

NoteReturn.defaultProps = {
    folders: {},
    notes: {}
}
