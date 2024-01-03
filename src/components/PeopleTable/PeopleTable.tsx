import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
        {people?.map(human => {
          const fatherLink
          = people.find(p => p.name === human.fatherName)?.slug;
          const motherLink
          = people.find(p => p.name === human.motherName)?.slug;

          return (
            <tr
              data-cy="person"
              className={human.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={`/people/${human.slug}`}
                  className={human.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {human.name}
                </Link>
              </td>

              <td>{human.sex}</td>
              <td>{human.born}</td>
              <td>{human.died}</td>
              <td>
                {motherLink ? (
                  <Link to={`/people/${motherLink}`} className="has-text-danger">
                    {human.motherName}
                  </Link>
                ) : (
                  `${human.motherName !== null ? human.motherName : '-'}`
                )}
              </td>
              <td>
                {fatherLink ? (
                  <Link to={`/people/${fatherLink}`}>
                    {human.fatherName}
                  </Link>
                ) : (
                  `${human.fatherName !== null ? human.fatherName : '-'}`
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
