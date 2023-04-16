import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedPerson: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedPerson }) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;

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
          const {
            sex,
            born,
            died,
            slug,
            fatherName,
            motherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} selectedPerson={selectedPerson} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {people.some(woman => woman.name === motherName)
                  ? (
                    <PersonLink
                      person={
                        people.find(
                          woman => woman.name === motherName,
                        ) || person
                      }
                      selectedPerson={selectedPerson}
                    />
                  )
                  : motherName || '-'}
              </td>
              <td>
                {people.some(man => man.name === fatherName)
                  ? (
                    <PersonLink
                      person={
                        people.find(man => man.name === fatherName) || person
                      }
                      selectedPerson={selectedPerson}
                    />
                  )
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
