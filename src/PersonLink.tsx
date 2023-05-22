import classNames from 'classnames';
import { Person } from './types';

export interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => (
  <a
    href={`#/people/${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </a>
);
