import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person;
  allPeople: Person[];
};

export const PersonLink: React.FC<Props> = ({ people, allPeople }) => {
  const { selectedPeople } = useParams();

  const mother = allPeople.find(person => person.name === people.motherName);
  const father = allPeople.find(person => person.name === people.fatherName);

  return (
    <tr
      key={people.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPeople === people.slug,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': people.sex === 'f' })}
          to={`${people.slug}`}
        >
          {people.name}
        </Link>
      </td>

      <td>{people.sex}</td>
      <td>{people.born}</td>
      <td>{people.died}</td>

      <td>
        {mother ? (
          <Link className="has-text-danger" to={mother.slug}>
            {mother.name}
          </Link>
        ) : (
          people.motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={father.slug}>{father.name}</Link>
        ) : (
          people.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
