import React, { useMemo } from 'react';
import { Person } from './types';
import PersonLink from './PersonLink';
import { useParams } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
};

const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const params = useParams();

  const peopleWithFamily = useMemo(() => {
    return people.map(person => {
      const newPerson = { ...person };

      if (newPerson.motherName) {
        newPerson.mother = people.find(p => p.name === newPerson.motherName);
      }

      if (newPerson.fatherName) {
        newPerson.father = people.find(p => p.name === newPerson.fatherName);
      }

      return newPerson;
    });
  }, [people]);

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
        {peopleWithFamily.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={
              person.slug === params.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
