import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataPerson } from '../types/DataPerson';
import { PersonLink } from './PersonLink';

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

/* {people.find((p: DataPerson) => p.name === person.motherName)
                ?.slug ? (
                <td>
                  <Link
                    className={`${person.sex === 'm' && 'has-text-danger'}`}
                    to={`${people.find((p: DataPerson) => p.name === person.motherName)?.slug}`}
                  >
                    {person.motherName ? person.motherName : '-'}
                  </Link>
                </td>
              ) : (
                <td>
                  <p>{person.motherName ? person.motherName : '-'}</p>
                </td>
              )}

              {people.find((p: DataPerson) => p.name === person.fatherName)
                ?.slug ? (
                <td>
                  <Link
                    to={`${people.find((p: DataPerson) => p.name === person.fatherName)?.slug}`}
                  >
                    {person.fatherName ? person.fatherName : '-'}
                  </Link>
                </td>
              ) : (
                <td>
                  <p>{person.fatherName ? person.fatherName : '-'}</p>
                </td>
              )} */
