import cn from 'classnames';
import { Person } from '../types/Person';
import { Link, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: slugLink } = useParams();

  return (
    <>
      {!people.length ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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
            {people.map(human => {
              const {
                slug,
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                father,
                mother,
              } = human;

              return (
                <tr
                  key={slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': slugLink === slug,
                  })}
                >
                  <td key={slug}>
                    <Link
                      to={`/people/${slug}`}
                      className={cn({ 'has-text-danger': sex === 'f' })}
                    >
                      {name}
                    </Link>
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother ? (
                      <Link
                        to={`/people/${mother.slug}`}
                        className="has-text-danger"
                      >
                        {mother.name}
                      </Link>
                    ) : (
                      motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link to={`/people/${father.slug}`}>{father.name}</Link>
                    ) : (
                      fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
