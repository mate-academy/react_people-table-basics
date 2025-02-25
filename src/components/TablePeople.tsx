import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { PersonLink } from './PersonLink';
import { DataPerson } from '../types/DataPerson';

const TableHead = () => (
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
);

type Props = {
  people: DataPerson[] | null;
};

export const TablePeople = ({ people }: Props) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <tbody>
        {people &&
          people.map((person: DataPerson) => (
            <tr
              className={`${person.slug === slug && 'has-background-warning'}`}
              key={person.name}
              data-cy="person"
            >
              <td>
                <Link
                  to={`${person.slug}`}
                  className={`${person.sex === 'f' && 'has-text-danger'}`}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {people.find(p => p.name === person.motherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.motherName)!}
                  />
                ) : (
                  <p>{person.motherName || '-'}</p>
                )}
              </td>

              <td>
                {people.find(p => p.name === person.fatherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.fatherName)!}
                  />
                ) : (
                  <p>{person.fatherName || '-'}</p>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
