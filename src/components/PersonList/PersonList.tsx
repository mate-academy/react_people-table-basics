import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

type Props = {
  persons: Person[];
  selectedSlug: string;
};

export const PersonList: React.FC<Props> = ({
  persons,
  selectedSlug,
}) => {
  if (!persons.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

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
        {persons.map(person => {
          const { motherName, fatherName, slug } = person;
          const personsMother = persons.find(pers => pers.name === motherName)
           || null;
          const personsFather = persons.find(pers => pers.name === fatherName)
           || null;

          return (
            <PersonInfo
              key={slug}
              person={person}
              personsMother={personsMother}
              personsFather={personsFather}
              selectedSlug={selectedSlug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
