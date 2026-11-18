import { Person } from '../../types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  users: Person[];
};

export const People = ({ users }: Props) => {
  const { slug } = useParams();

  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = users.find(person => person.name === name);

    return parent ? <PersonLink person={parent} /> : name;
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
        {users.map(user => (
          <tr
            data-cy="person"
            key={user.slug}
            className={classNames({
              'has-background-warning': user.slug === slug,
            })}
          >
            <td>
              <PersonLink person={user} />
            </td>

            <td>{user.sex}</td>
            <td>{user.born}</td>
            <td>{user.died}</td>
            <td>{renderParent(user.motherName)}</td>
            <td>{renderParent(user.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
