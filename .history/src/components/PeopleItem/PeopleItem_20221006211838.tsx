import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
  selectedPerson: string;
  setSelectedPerson: (str: string) => void;
}

export const PeopleItem: FC<Props> = ({
  person,
  selectedPerson,
  setSelectedPerson,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === selectedPerson },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <Link
          to={`/people/${selectedPerson}`}
          onc
        >
          {motherName || '-'}
        </Link>
      </td>
      <td><Link to={`/people/${slug}`}>{fatherName || '-'}</Link></td>
    </tr>
  );
};
