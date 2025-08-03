import { usePeopleContext } from '../../hooks/usePeopleContext';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

type Props = {
  selectedPerson: Person | null;
};

export const PeopleList: React.FC<Props> = ({ selectedPerson }) => {
  const { people } = usePeopleContext();

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
          const isSelected =
            selectedPerson !== null && person.slug === selectedPerson.slug;

          return (
            <PersonInfo
              key={person.slug}
              person={person}
              isSelected={isSelected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
