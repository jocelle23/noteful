import React, { useContext } from 'react';
import APIContext from '../APIContext';
import './NavBar.css'

export default function NavBar(props) {
    const context = useContext(APIContext)

    return (
        <nav>
            <ul>
                {context.folders.map(folder =>
                    <li key={folder.id} className="navFolder">
                        <a href={`/folder/${folder.id}`}>
                        {folder.name}
                        </a>
                    </li>
                )}
            </ul>
            <button 
            type="button"
            className="addFolderBtn"
            ><b>ADD FOLDER</b></button>
        </nav>
    )
}