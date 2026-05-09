import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => (
  <a
    href={`#/people/${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </a>
);
