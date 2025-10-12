import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedPersonSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
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
              const isSelected = person.slug === selectedPersonSlug;

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={isSelected ? 'has-background-warning' : undefined}
                >
                  <td>
                    <PersonLink person={person} people={people} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      <PersonLink
                        person={
                          people.find(p => p.name === person.motherName) || {
                            ...person,
                            name: person.motherName,
                            slug: person.motherName,
                            sex: 'f',
                          }
                        }
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      <PersonLink
                        person={
                          people.find(p => p.name === person.fatherName) || {
                            ...person,
                            name: person.fatherName,
                            slug: person.fatherName,
                            sex: 'm',
                          }
                        }
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
