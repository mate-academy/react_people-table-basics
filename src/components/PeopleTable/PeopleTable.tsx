import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';

type Props = {
  people: Person[];
  slug: string | undefined;
  peopleNames: string[];
};

export const PeopleTable: React.FC<Props> = ({ people, slug, peopleNames }) => {
  const getSelectedPersonSlug = (selectedPerson: string) => {
    return people.find(person => person.name === selectedPerson)?.slug;
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
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: personSlug,
          } = person;

          return (
            <tr
              key={personSlug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <td>
                <Link
                  relative="path"
                  to={`../${personSlug}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {motherName
                && peopleNames.includes(motherName)
                ? (
                  <td>
                    <Link
                      to={`../${getSelectedPersonSlug(motherName)}`}
                      className="has-text-danger"
                    >
                      {motherName}
                    </Link>
                  </td>
                ) : (
                  <td>{motherName || '-'}</td>
                )}

              {fatherName
                && peopleNames.includes(fatherName)
                ? (
                  <td>
                    <Link
                      to={`../${getSelectedPersonSlug(fatherName)}`}
                    >
                      {fatherName}
                    </Link>
                  </td>
                ) : (
                  <td>{fatherName || '-'}</td>
                )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
