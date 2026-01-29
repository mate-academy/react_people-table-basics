import classNames from 'classnames';
import { User } from '../../pages/PeoplePage';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

interface Props {
  users: User[];
}

export const PeopleTable: React.FC<Props> = ({ users }) => {
  const { slug } = useParams();

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
        {users?.map(user => {
          return (
            <tr
              data-cy="person"
              key={user.slug}
              className={classNames({
                'has-background-warning': slug === user.slug,
              })}
            >
              <td>
                <PersonLink person={user} isNav />
              </td>

              <td>{user.sex}</td>
              <td>{user.born}</td>
              <td>{user.died}</td>
              <td>
                <PersonLink name={user.motherName} people={users} />
              </td>
              <td>
                <PersonLink name={user.fatherName} people={users} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
