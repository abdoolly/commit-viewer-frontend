import React from 'react';
import './InputField.css';

const InputField = ({ children, label }) => {
    return (
        <div className="input-field">
            {label ? <label>{label}</label> : null}
            {children}
        </div>
    );
};

export default InputField;