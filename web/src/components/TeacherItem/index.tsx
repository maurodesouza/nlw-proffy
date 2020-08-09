import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars3.githubusercontent.com/u/54520907?s=460&u=b9f625ca038b7223adf61fa5ba01b0b80cb6a550&v=4" alt="Mauro de Souza"/>
        <div>
          <strong>Mauro de Souza</strong>
          <span>Developer</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br /><br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
      </p>

      <footer>
        <p>
          preço/hora
          <strong>R$ 20,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          <span>Entrar em contato</span>
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
