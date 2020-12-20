import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../NavBar';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <p className="errorMsg">
                        <strong>Looks like something went wrong! Please try again.</strong>
                    </p>
                    <Route
                        path='/'
                        component={NavBar}
                    />

                </>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    hasError: PropTypes.bool
};