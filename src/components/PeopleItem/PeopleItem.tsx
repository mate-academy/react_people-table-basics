import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import React from 'react';

type Props = {
  person: Person;
  personId: string;
  people: Person[];
};
export const PeopleItem: React.FC<Props> = ({ person, personId, people }) => {
  const { motherName, fatherName, name, sex, born, died } = person;

  const isSelected = (human: Person) => human.slug === personId;

  const motherFind = people.find(
    ({ name: personName }) => personName === person.motherName,
  );

  const fatherFind = people.find(
    ({ name: personName }) => personName === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected(person),
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherFind ? (
          <Link to={`/people/${motherFind.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : motherName ? (
          motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherFind ? (
          <Link to={`/people/${fatherFind.slug}`}>{fatherName}</Link>
        ) : fatherName ? (
          fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
