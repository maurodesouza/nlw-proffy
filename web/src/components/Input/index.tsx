import React, { InputHTMLAttributes } from 'react';

import './styles.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string
}

const Input: React.FC<Props> = ({ label, name, ...rest}) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name}/>
    </div>
  );
}

export default Input;