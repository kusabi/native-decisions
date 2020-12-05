import React from 'react';

class Condition extends React.Component {

    static defaultProps = {
        condition: true
    }

    render() {
        return this.props.condition ? this.props.children : (null);
    }
}

export default Condition;