import React from 'react';

class ErrorBoundary extends React.Component {

    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasErrored: true
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) {
            return (<div>Error</div>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary;