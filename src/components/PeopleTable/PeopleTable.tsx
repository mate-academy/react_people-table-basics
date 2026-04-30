import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
  selectedPerson: Person | null;
  onPersonSelect: (person: Person) => void;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  onPersonSelect,
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
              const mother = people.find(p => p.name === person.motherName);

              const father = people.find(p => p.name === person.fatherName);

              const isSelected = selectedPerson?.slug === person.slug;

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={isSelected ? 'has-background-warning' : ''}
                  onClick={() => onPersonSelect(person)}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {person.motherName ? (
                      mother ? (
                        <PersonLink person={mother} />
                      ) : (
                        <span>{person.motherName}</span>
                      )
                    ) : (
                      '-'
                    )}
                  </td>

                  <td>
                    {person.fatherName ? (
                      father ? (
                        <PersonLink person={father} />
                      ) : (
                        <span>{person.fatherName}</span>
                      )
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
