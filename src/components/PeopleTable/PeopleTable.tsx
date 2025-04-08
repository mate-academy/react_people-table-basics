import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type PeopleProps = {
  people: Person[] | undefined;
};

export const PeopleTable = ({ people }: PeopleProps) => {
  const { slug } = useParams();

  const findPersonByName = (name: string | null): Person | undefined => {
    return people?.find(p => p.name === name);
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
      {people?.map(person => {
        const isSelected = person.slug === slug;
        const mother = findPersonByName(person.motherName);
        const father = findPersonByName(person.fatherName);

        return (
          <tbody key={person.slug}>
            <tr
              data-cy="person"
              className={isSelected ? `has-background-warning` : ''}
            >
              <td>
                <PersonLink
                  person={person}
                  isWoman={person.sex === 'f'}
                  name={person.name}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink
                    person={mother}
                    isWoman={true}
                    name={person.motherName}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink
                    person={father}
                    isWoman={false}
                    name={person.fatherName}
                  />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
