import React from 'react';
import APIContext from '../APIContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SingleNote.css';

export default class SingleNote extends React.Component {
    static contextType = APIContext;

    static defaultProps = {
        onDeleteNote: () => { }
    }

    deleteButton = (e) => {
        e.preventDefault();
        const { deleteItem } = this.context;
        fetch(`http://localhost:9090/notes/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('There was an error in deletion or item has already been deleted.')
                }
                return response.json();
            })
            .then(() => {
                deleteItem(this.props.id);
                this.props.onDeleteNote()
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        
        return (
            <div>
                <Link to={`/note${this.props.id}`}>
                    <h2 className="center">{this.props.name}</h2>
                </Link>
                <p className="noteContents">{this.props.content}</p>
                <button
                    type="button"
                    className="removeBtn2"
                    onClick={this.deleteButton}
                >
                    <b>REMOVE</b>
                </button>
            </div>
        )
    }
}

SingleNote.propType = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDeleteNote: PropTypes.object,
};