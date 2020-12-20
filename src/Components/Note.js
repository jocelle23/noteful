import React from 'react';
import APIContext from '../APIContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Note.css'

export default class Note extends React.Component {
    static contextType = APIContext;

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
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <li
                    key={this.props.id}
                    className="notesList"
                >
                    <Link to={`/note/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                    <button
                        type="button"
                        onClick={this.deleteButton}
                        className="removeBtn"
                    >
                        <b>REMOVE</b>
                    </button>
                </li>
            </div>
        )
    }
}

Note.propType = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};