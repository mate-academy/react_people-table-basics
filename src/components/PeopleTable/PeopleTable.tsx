import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findPerson = (relativeName: string | null) => {
    return people.find(person => person.name === relativeName);
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
        {people.length > 0 &&
          people.map(person => (
            <PersonLink
              key={person.slug}
              person={person}
              findPerson={findPerson}
            />
          ))}
      </tbody>
    </table>
  );
};
