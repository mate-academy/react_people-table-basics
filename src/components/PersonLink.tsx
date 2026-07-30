import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

interface Props {
  personName: string | null | undefined;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  if (!personName) {
    return '-';
  }

  const targetPerson = people.find(p => p.name === personName);

  if (!targetPerson) {
    return <span>{personName}</span>;
  }

  return (
    <Link
      to={`/people/${targetPerson.slug}`}
      className={classNames({
        'has-text-danger': targetPerson.sex === 'f',
      })}
    >
      {targetPerson.name}
    </Link>
  );
};
