import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { Person } from '../../types/Person';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames(
            {
              'has-text-danger': parent.sex === 'f',
            },
          )}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                {
                  'has-background-warning': slug === person.slug,
                },
              )}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames(
                    {
                      'has-text-danger': person.sex === 'f',
                    },
                  )}
                >
                  {person.name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findParent(motherName)}</td>
              <td>{findParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
