import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { Sex } from '../types/Sex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const getNameClass = () => {
    return classNames({ 'has-text-danger': person.sex === Sex.FEMALE });
  };

  return (
    <Link to={person.slug} className={getNameClass()}>
      {person.name}
    </Link>
  );
};
