import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  people: Person[];
}
export const PersonItem: React.FC<Props> = ({ person, people }) => {
  const { personId } = useParams();
  const { motherName, fatherName } = person;

  const motherNameFounded = people.find(human => human.name === motherName);
  const fatherNameFounded = people.find(human => human.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personId === person.slug,
      })}
      key={person.slug}
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
        {person.motherName ? (
          motherNameFounded ? (
            <Link
              className="has-text-danger"
              to={`/people/${motherNameFounded.slug}`}
            >
              {person.motherName}
            </Link>
          ) : (
            <span>{person.motherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          fatherNameFounded ? (
            <Link to={`/people/${fatherNameFounded.slug}`}>
              {person.fatherName}
            </Link>
          ) : (
            <span>{person.fatherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
