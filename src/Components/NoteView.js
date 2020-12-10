import React from 'react';

export default function NoteView(props) {
    return (
        <div>
            <h2>{props.note.name}</h2>
            <p>{props.note.content}</p>
        </div>
    )
}

NoteView.defaultProps = {
    note: {},
}