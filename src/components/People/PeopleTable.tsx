import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleLink } from './PeopleLink';

type Prop = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Prop> = ({ peopleList }) => {
  const { personSlug } = useParams();

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
        {peopleList.map(p => (
          <tr
            key={p.slug}
            data-cy="person"
            className={personSlug === p.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PeopleLink person={p} />
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.mother ? (
                <PeopleLink person={p.mother} />
              ) : p.motherName ? (
                p.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {p.father ? (
                <PeopleLink person={p.father} />
              ) : p.fatherName ? (
                p.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
