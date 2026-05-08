import { PeopleDictionary, PersonSlug } from '../../types';
import { PersonTableRow } from '../PersonTableRow';

type Props = {
  people: PeopleDictionary;
  peopleSlugs: PersonSlug[];
};

export const PeopleTable: React.FC<Props> = ({ people, peopleSlugs }) => {
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
        {peopleSlugs.map(slug => (
          <PersonTableRow key={slug} person={people[slug]} />
        ))}
      </tbody>
    </table>
  );
};
