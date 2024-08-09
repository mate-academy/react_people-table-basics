import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { FC } from 'react';

enum Sex {
  Female = 'f',
  Male = 'm',
}

type Props = {
  people: Person[];
};

export const TabPeople: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findPersonByName = (name: string | undefined) =>
    people.find(person => person.name === name);

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
          ({
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug: personSlug,
          }) => (
            <tr
              data-cy="person"
              key={personSlug}
              className={classNames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={`/people/${personSlug}`}
                  className={classNames({
                    'has-text-danger': sex === Sex.Female,
                  })}
                >
                  {name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherName && findPersonByName(motherName)?.slug ? (
                  <Link
                    to={`/people/${findPersonByName(motherName)?.slug}`}
                    className="has-text-danger"
                  >
                    {motherName}
                  </Link>
                ) : (
                  <span>{motherName || '-'}</span>
                )}
              </td>
              <td>
                {fatherName && findPersonByName(fatherName)?.slug ? (
                  <Link to={`/people/${findPersonByName(fatherName)?.slug}`}>
                    {fatherName}
                  </Link>
                ) : (
                  <span>{fatherName || '-'}</span>
                )}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
