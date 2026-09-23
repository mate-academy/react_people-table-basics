import { Link } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

const getRelatedPerson = (
  name: string | null,
  people: Person[],
): Person | undefined => {
  if (!name) {
    return undefined;
  }

  return people.find(person => person.name === name);
};

type PersonLinkProps = {
  person: Person;
  people: Person[];
};

const PersonLink = ({ person, people }: PersonLinkProps) => {
  const relatedPerson = getRelatedPerson(person.name, people);

  if (!relatedPerson) {
    return <>{person.name}</>;
  }

  return (
    <Link
      to={`/people/${relatedPerson.slug}`}
      className={relatedPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {relatedPerson.name}
    </Link>
  );
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
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
          const mother = getRelatedPerson(person.motherName, people);
          const father = getRelatedPerson(person.fatherName, people);
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
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
