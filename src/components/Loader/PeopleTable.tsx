/* eslint-disable prettier/prettier */
import { Person } from '../../types/Person';
import { PersonLink } from '../Loader/PersonLink';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

export const PeopleTable = ({
  people,
  selectedPersonSlug,
}: Props) => {
  const findPerson = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name) || null;
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
          const mother = findPerson(person.motherName);
          const father = findPerson(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedPersonSlug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
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
                    <PersonLink person={father} />
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
