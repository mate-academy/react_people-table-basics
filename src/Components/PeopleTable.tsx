import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';

interface PeopleTableProps {
  people: Person[];
}

const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams();

  return (
    <div>
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage" className="has-text-centered">
          No people found
        </p>
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
            {people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={person.slug === slug ? 'has-background-warning' : ''}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>
                <td>
                  {person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PeopleTable;
