import React from 'react';

const Option = (props) => {
    let { onClick, answer, ...rest } = props;
    return (
        <div onClick={() => onClick(answer)} className="options" {...rest} />
    )
}

export default Option;