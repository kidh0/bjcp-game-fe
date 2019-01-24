import React from 'react';

class Option extends React.Component {

    render() {
        let { onClick, answer, ...rest } = this.props;
        return (
            <div onClick={() => onClick(answer)} className="options" {...rest} />
        )
    }
}

export default Option;