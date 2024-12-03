import { Link, useParams } from 'react-router-dom';
import data from '../../../public/api/people.json';
import classNames from 'classnames';
import { Person } from '../../types';

const getSlugByName = (name: string) => {
  const person = data.find(p => p.name === name);

  return person ? person.slug : null;
};

interface PeopleProps {
  people: Person[];
}

export const People = ({ people }: PeopleProps) => {
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
        {people.map(person => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            data-cy="person"
          >
            <td>
              <Link
                className={person.sex === 'f' ? 'has-text-danger' : ''}
                to={`/people/${person.slug}`}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                data.some(p => p.name === person.motherName) ? (
                  <Link
                    to={`/people/${getSlugByName(person.motherName)}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                data.some(p => p.name === person.fatherName) ? (
                  <Link to={`/people/${getSlugByName(person.fatherName)}`}>
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName
                )
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
