import { Link, useParams } from 'react-router-dom';
import { EnrichPerson } from '../types';
import classNames from 'classnames';

type Props = {
  people: EnrichPerson[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;
  const { personSlug } = useParams();

  const isPersoninList = (slug: string | undefined) => {
    const result = people.some(person => person.slug === slug);

    return result;
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <>
                  {isPersoninList(person.mother?.slug) ? (
                    <Link
                      className="has-text-danger"
                      to={`../${person.mother?.slug}`}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )}
                </>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <>
                  {isPersoninList(person.father?.slug) ? (
                    <Link to={`../${person.father?.slug}`}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )}
                </>
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
