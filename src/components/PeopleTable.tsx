import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { selectedPerson } = useParams();

  const fatherFinder = (person: Person) => {
    return people.find(p => p.name === person.fatherName);
  };

  const motherFinder = (person: Person) => {
    return people.find(p => p.name === person.motherName);
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
        {people &&
          people.map(person => (
            <tr
              data-cy="person"
              className={
                person.slug === selectedPerson ? 'has-background-warning' : ''
              }
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {motherFinder(person) ? (
                  <PersonLink person={motherFinder(person)!} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {fatherFinder(person) ? (
                  <PersonLink person={fatherFinder(person)!} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
