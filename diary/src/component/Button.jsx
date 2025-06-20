import React from 'react';
import './Button.css';

const Button = ({ text, type, onClick }) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button className={["button", `button_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};


export default Button;
