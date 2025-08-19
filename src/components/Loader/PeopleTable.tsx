import { useMemo } from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../Loader/PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string | null;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const peopleByName = useMemo(() => {
    const dict: { [key: string]: Person } = {};

    people.forEach(person => {
      const normalizedName = person.name.toLowerCase().trim();

      dict[normalizedName] = person;
    });

    return dict;
  }, [people]);

  const findPerson = (name: string | null) => {
    if (!name || name.trim() === '' || name === '-') {
      return null;
    }

    const normalizedSearchName = name.toLowerCase().trim();
    const foundPerson = peopleByName[normalizedSearchName];

    if (!foundPerson) {
      return {
        name: name,
        sex: '',
        born: 0,
        died: 0,
        fatherName: null,
        motherName: null,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      };
    }

    return foundPerson;
  };

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">No people</p>;
  }

  return (
    <div data-cy="people-table-container">
      <table className="table is-striped is-fullwidth" data-cy="peopleTable">
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
                  selectedSlug === person.slug ? 'has-background-warning' : ''
                }
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  <PersonLink person={mother} />
                </td>
                <td>
                  <PersonLink person={father} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
