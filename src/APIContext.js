import React from 'react';

export default React.createContext({
    notes: [],
    folders: [],
    deleteItem: () => { },
    toggle: false,
    addFolder: () => {},
    addNote: () => {},
    toggleErrors: () => {},
    throwError: () => {},
    back: () => {}
})