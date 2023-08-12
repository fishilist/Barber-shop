import React from 'react';
import "./ButtonBlack.scss"

function ButtonBlack({text}) {
    return (
        <button className={'button-black h6 white'}>{text}</button>
    );
}

export default ButtonBlack;