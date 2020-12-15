import React, { useContext } from 'react';
import { findNote, findFolder } from '../NoteHelpers';
import APIContext from '../APIContext';
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

                <h2 className="folderName">
                    {folder.name}
                </h2>
            </div>
        )
    
}