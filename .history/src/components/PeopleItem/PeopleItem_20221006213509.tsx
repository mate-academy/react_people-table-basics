import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import PersonLink from '../PersonLink';

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
          to={`/people/${slug}`}
          onClick={() => {
            setSelectedPerson(selectedPerson);
          }}
        >
          {motherName || '-'}
        </Link>
      </td>
      {/* <td><Link to={`/people/${slug}`}>{fatherName || '-'}</Link></td> */}
      <td><PersonLink person={} ></td>
    </tr>
  );
};
