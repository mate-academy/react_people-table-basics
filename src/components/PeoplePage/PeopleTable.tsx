import { Person } from '../../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[] | null;
  activeSlug?: string;
}

export const PeopleTable = ({ people, activeSlug }: Props) => {
  const findPersonByName = (name: string | null) =>
    people?.find(person => person.name === name);

  return (
    <>
      {!people ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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
              const mother = findPersonByName(person.motherName);
              const father = findPersonByName(person.fatherName);

              return (
                <tr
                  data-cy="person"
                  key={person.name}
                  className={
                    person.slug === activeSlug
                      ? 'has-background-warning'
                      : undefined
                  }
                >
                  <td>
                    <PersonLink person={person} />
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
      )}
    </>
  );
};
