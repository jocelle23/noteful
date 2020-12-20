import React, { useContext } from 'react';
import APIContext from '../APIContext';
import './NavBar.css';
import { Link } from 'react-router-dom';

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
            <Link
                to='/add-folder'
            >
                <button
                    className="addFolderBtn"
                    type="button"
                >
                  <b>ADD FOLDER</b> 
           </button>
            </Link>
        </nav>
    )
}