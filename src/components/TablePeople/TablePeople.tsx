import { useParams } from 'react-router-dom';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { PropsTablePage } from './PropsTablePage';

export const TablePeople: React.FC<PropsTablePage> = ({ list }) => {
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
        {list.length ? list.map(person => (
          <PersonInfo
            person={person}
            selectedSlug={personSlug}
            key={person.slug}
          />
        )) : (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </tbody>
    </table>
  );
};
