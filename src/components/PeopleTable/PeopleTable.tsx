import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  people: Person[],
  selectedSlug: string,
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedSlug === person.slug,
              })}
            >
              <td>
                <Link
                  className={classNames(
                    { 'has-text-danger': sex === 'f' },
                  )}
                  to={`../${slug}`}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother && (
                  <Link
                    className="has-text-danger"
                    to={`../${mother.slug}`}
                  >
                    {motherName}
                  </Link>
                )}

                {!mother && motherName}

                {!motherName && '-'}
              </td>

              <td>
                {father && (
                  <Link
                    to={`../${father.slug}`}
                  >
                    {fatherName}
                  </Link>
                )}

                {!father && fatherName}

                {!fatherName && '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
