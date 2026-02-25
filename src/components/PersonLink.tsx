// Componente reutilizável para renderizar o nome de uma pessoa como um link.
// Usado em 3 lugares: coluna "Name", coluna "Mother" e coluna "Father".
//
// Comportamento:
//   - Gera um <Link> apontando para /people/{slug}
//   - Aplica a classe "has-text-danger" (texto vermelho) se a pessoa for mulher (sex === 'f')

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </Link>
);
