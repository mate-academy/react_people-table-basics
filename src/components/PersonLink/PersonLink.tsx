import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import classNames from 'classnames';

type Props = {
  name: string;
  people: Person[];
};

export const PersonLink = ({ name, people }: Props) => {
  if (!name) {
    return '-';
  }

  const foundPerson = people.find(person => person.name === name);

  if (foundPerson) {
    return (
      <Link
        to={`/people/${foundPerson.slug}`}
        className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
      >
        {foundPerson.name}
      </Link>
    );
  } else {
    return name;
  }
};
