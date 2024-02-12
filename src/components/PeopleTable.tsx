/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Human } from './Human';
import { Person } from '../types';

interface PeopleTableProps {
  people: Person[]
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
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
        {people?.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames(
              { 'has-background-warning active': slug === person.slug },
            )}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={classNames(
                  { 'has-text-danger': person.sex === 'f' },
                )}
              >
                <Human person={person} />
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.mother && <Human person={person.mother} />}
                </Link>
              ) : person.motherName ? person.motherName : '-'}

            </td>

            <td>
              {person.father ? (
                <Link to={`/people/${person.father.slug}`}>
                  {person.father && <Human person={person.father} />}
                </Link>
              ) : person.fatherName ? person.fatherName : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
