import { Link } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';

type PersonLinkType = { person: Person };
const PersonLink: React.FC<PersonLinkType> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);

type Props = {
  selected: string;
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ selected, people }) => {
  function peopleByName(name: string) {
    return people.find(person => person.name === name);
  }

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
        {people.map(person => {
          const mother = person.motherName
            ? peopleByName(person.motherName)
            : null;
          const father = person.fatherName
            ? peopleByName(person.fatherName)
            : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                selected === person.name ? 'has-background-warning' : ''
              }
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
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
