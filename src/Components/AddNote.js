import React from 'react';
import APIContext from '../APIContext';
import PropTypes from 'prop-types';
import config from '../config';

export default class AddNote extends React.Component {
    state = {
        title: "",
        content: "",
        folderSelect: "",
        folderId: "",
        formValid: false,
        titleValid: false,
        contentValid: false,
        folderSelectValid: false,
        validationMessage: null,
        forErrors: this.props.match,
        toggle: true
    };

    static contextType = APIContext;

    goBack = () => {
        this.props.history.goBack();
    }

    updateFormEntry(e) {
        const name = e.target.name;
        const value = e.target.value;
        let id;
        if (e.target.selectedOptions) {
            id = e.target.selectedOptions[0].id;
            this.setState({
                'folderId': id
            })
        }
        this.setState({
            [e.target.name]: e.target.value,

        }, () => { this.validateEntry(name, value) });
    }

    validateEntry(name, value) {
        let hasErrors = false;

        value = value.trim();
        if ((name === 'title') || (name === 'content')) {
            if (value.length < 1) {
                hasErrors = true
            }

            else {
                hasErrors = false
            }
        }

        else if ((name === 'folderSelect') && (value === 'Select')) {
            hasErrors = true
        }

        else {
            hasErrors = false
        }

        this.setState({
            [`${name}Valid`]: !hasErrors,
        }, this.formValid);
    }

    formValid() {
        const { titleValid, contentValid, folderSelectValid } = this.state;
        if (titleValid && contentValid && folderSelectValid === true) {
            this.setState({
                formValid: true,
                validationMessage: null
            });
        }
        else {
            this.setState({
                formValid: !this.formValid,
                validationMessage: 'All fields are required.'
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { title, content, folderId } = this.state;
        const note = {
            name: title,
            content: content,
            folderId: folderId,
            modified: new Date()
        }

        this.setState({ error: null })


        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        console.log(`Error is: ${err}`)
                        throw err
                    })
                }
                return res.json()
            })
            .then(data => {
                this.goBack()
                this.context.addNote(data)
            })
            .catch(err => {
                this.setState({ err })
            })
    }

    render() {
        const folders = this.context.folders;
        const options = folders.map((folder) => {
            return (
                <option
                    key={folder.id}
                    id={folder.id}>
                    {folder.name}
                </option>
            )
        })
        
        if(this.state.toggle === false) {
            this.setState({
              forErrors: 'err'
            })
            this.setState({
              forErrors: this.props.match
            })
          }

        return (
            <form
                className="center"
                onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Note</h2>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        aria-label="Note Title"
                        aria-required="true"
                        placeholder="Note Title"
                        aria-placeholder="Note Title"
                        onChange={e => this.updateFormEntry(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Note: </label>
                    <textarea
                        name="content"
                        id="content"
                        aria-label="Note content:"
                        aria-required="false"
                        onChange={e => this.updateFormEntry(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor="folder-select">Folder: </label>
                    <select
                        type="text"
                        name="folderSelect"
                        id="folder-select"
                        aria-label="folder"
                        aria-required="true"
                        ref={this.folderSelect}
                        onChange={e => this.updateFormEntry(e)}>
                        <option>Select</option>
                        {options}
                    </select>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => this.goBack()}>
                        Cancel
                 </button>
                    <button
                        type="submit"
                        disabled={!this.state.formValid}>
                        Save
                 </button>
                </div>
            </form>
        )
    }
}


AddNote.propType = {
    history: PropTypes.object.isRequired
};