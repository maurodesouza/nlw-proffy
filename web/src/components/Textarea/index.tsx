import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string
}

const textarea: React.FC<Props> = ({ label, name, ...rest}) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea {...rest} id={name}/>
    </div>
  );
}

export default textarea;