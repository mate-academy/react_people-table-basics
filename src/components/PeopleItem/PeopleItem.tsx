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
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherFind ? (
          <Link to={`/people/${motherFind.slug}`} className="has-text-danger">
            {person.motherName || '-'}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {fatherFind ? (
          <Link to={`/people/${fatherFind.slug}`}>
            {person.fatherName || '-'}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
