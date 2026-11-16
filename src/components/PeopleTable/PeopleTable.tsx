import { Person } from '../../types';

import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
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
          const mother = people.find(name => name.name === person.motherName);
          const father = people.find(name => name.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedPerson?.slug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} people={people} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} people={people} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} people={people} />
                  ) : (
                    person.fatherName
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
  );
};
