import { useState, useMemo } from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const existingPeopleSlugs = useMemo(
    () => new Set(people.map(person => person.slug)),
    [people],
  );

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
            {people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': selectedPerson === person.slug,
                })}
                onClick={() => setSelectedPerson(person.slug)}
              >
                <td>
                  <PersonLink
                    person={person}
                    existingPeopleSlugs={existingPeopleSlugs}
                  />
                </td>

                <td
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.sex}
                </td>

                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {person.motherName ? (
                    <PersonLink
                      person={{ ...person, name: person.motherName }}
                      existingPeopleSlugs={existingPeopleSlugs}
                    />
                  ) : (
                    '-'
                  )}
                </td>

                <td>
                  {person.fatherName ? (
                    <PersonLink
                      person={{ ...person, name: person.fatherName }}
                      existingPeopleSlugs={existingPeopleSlugs}
                    />
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
