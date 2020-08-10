import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import { api } from '../../services/api';

export type Teacher = {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
};

type Props = {
  teacher: Teacher;
};

const TeacherItem: React.FC<Props> = ({ teacher }) => {
  const createNewConnection = () => {
    api.post('connections', {
      user_id: teacher.id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name}/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          preço/hora
          <strong>{teacher.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
        </p>

        <a
          onClick={createNewConnection}
          rel="noopener noreferrer"
          target="_blank"
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          <span>Entrar em contato</span>
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;
