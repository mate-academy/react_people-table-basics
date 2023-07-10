// import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  // people: Person[];
  people: Person[];
  findMotherSlug: (person: Person) => string | null;
  findFatherSlug: (person: Person) => string | null;
  selectedPerson: string | undefined;
  // isDataUploaded: boolean;
}

export const PeopleTable: React.FC<Props> = ({
  // people,
  people,
  findMotherSlug,
  findFatherSlug,
  selectedPerson,
}) => {
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
          <PersonLink
            // people={people}
            person={person}
            findMotherSlug={findMotherSlug}
            findFatherSlug={findFatherSlug}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
