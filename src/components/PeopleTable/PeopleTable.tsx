import { FC, useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const getPersonByName = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
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
        {people.map(person => {
          const mother = getPersonByName(person.motherName || '-');
          const father = getPersonByName(person.fatherName || '-');

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                selectedPersonId === person.slug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink
                  person={person}
                  setSelectedPersonId={setSelectedPersonId}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink
                    person={mother}
                    setSelectedPersonId={setSelectedPersonId}
                  />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink
                    person={father}
                    setSelectedPersonId={setSelectedPersonId}
                  />
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
