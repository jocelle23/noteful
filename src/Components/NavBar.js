import React from 'react';

export default function NavBar(props) {
    return (
        <nav>
            <ul>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <a href={`/folder/${folder.id}`}>
                        {folder.name}
                        </a>
                    </li>
                )}
            </ul>
            <button type="button">Add Folder</button>
        </nav>
    )
}