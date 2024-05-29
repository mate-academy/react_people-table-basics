import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { currSlug } = useParams();

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
        {people.map(
          ({ slug, name, sex, fatherName, motherName, born, died }) => {
            const mother = people.find(person => person.name === motherName);
            const father = people.find(person => person.name === fatherName);

            return (
              <tr
                data-cy="person"
                key={slug}
                className={cn({
                  'has-background-warning': currSlug === slug,
                })}
              >
                <td>
                  <Link
                    to={`../${slug}`}
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
                    <Link className="has-text-danger" to={`../${mother.slug}`}>
                      {mother.name}
                    </Link>
                  ) : (
                    motherName || '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <Link to={`../${father.slug}`}>{father.name}</Link>
                  ) : (
                    fatherName || '-'
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
