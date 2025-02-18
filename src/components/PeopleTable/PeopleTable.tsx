import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name);
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
        {people.map(person => (
          <PersonInfo
            person={person}
            findPersonByName={findPersonByName}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
