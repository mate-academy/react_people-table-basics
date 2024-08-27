import { PeopleContext } from '../../contexts/PeopleContext';
import { Person } from '../../types';
import { PersonRow } from './PersonRow';

type Props = {
  selectedPersonSlug?: Person['slug'];
};

export const PeopleTable = ({ selectedPersonSlug }: Props) => {
  const { people } = PeopleContext.useState();

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
        {people.value.map(person => {
          return (
            <PersonRow
              key={person.slug}
              person={person}
              highlighted={person.slug === selectedPersonSlug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
