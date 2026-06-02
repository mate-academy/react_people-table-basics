import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  usersData: Person[];
};

export const PeopleTable = ({ usersData }: Props) => {
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
        {usersData.map(user => {
          const mother = usersData.find(p => p.name === user.motherName);
          const father = usersData.find(p => p.name === user.fatherName);
          const currentSlug = user.slug === slug;

          return (
            <tr
              className={currentSlug ? 'has-background-warning' : ''}
              key={user.slug}
              data-cy="person"
            >
              <td>
                <PersonLink person={user} />
              </td>
              <td>{user.sex}</td>
              <td>{user.born}</td>
              <td>{user.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  user.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  user.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
