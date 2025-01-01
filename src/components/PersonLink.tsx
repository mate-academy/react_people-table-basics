import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName } = person;

  const findMother = people.find(individual => individual.name === motherName);
  const findFather = people.find(individual => individual.name === fatherName);

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link to={person.slug} className={sex === 'f' ? 'has-text-danger' : ''}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {motherName ? (
        <td>
          {findMother ? (
            <Link
              to={findMother.slug}
              className={findMother.sex === 'f' ? 'has-text-danger' : ''}
            >
              {motherName}
            </Link>
          ) : (
            motherName
          )}
        </td>
      ) : (
        <td>-</td>
      )}

      {fatherName ? (
        <td>
          {findFather ? (
            <Link to={findFather.slug}>{fatherName}</Link>
          ) : (
            fatherName
          )}
        </td>
      ) : (
        <td>-</td>
      )}
    </tr>
  );
};
