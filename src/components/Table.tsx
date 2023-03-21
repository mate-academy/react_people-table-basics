import { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[],
};

export const Table: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();

  const femaleNames = useMemo(
    () => new Set(people
      .filter((item) => item.sex === 'f')
      .map((item) => item.name)),
    [people],
  );

  const peopleMap = useMemo(
    () => new Map(people.map((person) => [person.name, person])),
    [people],
  );

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
        {people.map((item) => (
          <tr
            key={item.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': item.slug === personId,
            })}
          >
            <td>
              <Link
                to={`/people/${item.slug}`}
                className={classNames({
                  'has-text-danger': femaleNames.has(item.name),
                })}
              >
                {item.name}
              </Link>
            </td>

            <td>{item.sex}</td>
            <td>{item.born}</td>
            <td>{item.died}</td>
            <td>
              {item.motherName && peopleMap.has(item.motherName) ? (
                <Link
                  to={`/people/${peopleMap.get(item.motherName)?.slug}`}
                  className="has-text-danger"
                >
                  {item.motherName}
                </Link>
              ) : (
                item.motherName || '-'
              )}
            </td>
            <td>
              {item.fatherName && peopleMap.has(item.fatherName) ? (
                <Link to={`/people/${peopleMap.get(item.fatherName)?.slug}`}>{item.fatherName}</Link>
              ) : (
                item.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
