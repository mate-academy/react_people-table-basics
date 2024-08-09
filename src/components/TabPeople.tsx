import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { FC } from 'react';

type Props = {
  people: Person[];
};

export const TabPeople: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const mother = (person: Person) =>
    people.find(per => per.name === person.motherName);
  const father = (person: Person) =>
    people.find(per => per.name === person.fatherName);

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
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
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
              {person.motherName && mother(person)?.slug ? (
                <Link
                  to={`/people/${mother(person)?.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                <span>{person.motherName || '-'}</span>
              )}
            </td>
            <td>
              {person.fatherName && father(person)?.slug ? (
                <Link to={`/people/${father(person)?.slug}`}>
                  {person.fatherName}
                </Link>
              ) : (
                <span>{person.fatherName || '-'}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
