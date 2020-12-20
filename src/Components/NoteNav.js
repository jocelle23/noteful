import React, { useContext } from 'react';
import { findNote, findFolder } from '../NoteHelpers';
import APIContext from '../APIContext';
import PropTypes from 'prop-types';
import './NoteNav.css';

export default function NoteNav(props) {
    const context = useContext(APIContext)
    const note = findNote(context.notes, props.match.params.noteId) || {}
    const folder = findFolder(context.folders, note.folderId) || {}
    
        return (
            <div>
                <button
                    type="button"
                    className="backBtn"
                    onClick={() => props.history.goBack()}
                >
                    <b>GO BACK</b>
            </button>

                <h2 className="center">
                    {folder.name}
                </h2>
            </div>
        )
    
}


NoteNav.propType = {
    match: PropTypes.object.isRequired,
    params: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};