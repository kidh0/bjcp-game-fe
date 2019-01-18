import React from 'react';

class Option extends React.Component {

    render() {
        let { onClick, answer, id, ...rest } = this.props;
        return (
            <div onClick={() => onClick(answer)} className="options" id={`option-${id}`} {...rest} />
        )
    }
}

export default Option;