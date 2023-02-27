import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

export type Props = {
  peopleList: Person[];
};

export const TablePeople: React.FC<Props> = ({ peopleList }) => {
  const { personSlug = '' } = useParams();

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
        {peopleList.length
          ? peopleList.map(person => {
            return (
              <PersonInfo
                person={person}
                selectedSlug={personSlug}
                key={person.slug}
              />
            );
          })
          : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
      </tbody>
    </table>
  );
};
