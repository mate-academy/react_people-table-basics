import React from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

interface PersonTableProps {
  data: Person[];
  isLoading: boolean;
  error: string | null;
}

export const PersonTable: React.FC<PersonTableProps> = ({
  data,
  isLoading,
  error,
}) => {
  const { slug } = useParams();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (!data.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const getPersonLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = data.find(p => p.name === name);

    return foundPerson ? <PersonLink person={foundPerson} /> : name;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {data.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getPersonLink(person.motherName)}</td>
            <td>{getPersonLink(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
