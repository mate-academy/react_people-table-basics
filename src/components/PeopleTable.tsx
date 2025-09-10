import React, { useState } from 'react';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  people: Person[];
  loading: boolean;
  error: string;
};

export const PeopleTable: React.FC<Props> = ({ people, loading, error }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="block">
      <div className="box table-container">
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
                fatherName,
                motherName,
                slug: personSlug,
              } = person;

              const mother = people.find(p => p.name === person.motherName);
              const father = people.find(p => p.name === person.fatherName);

              return (
                <tr
                  key={personSlug}
                  data-cy="person"
                  onClick={() => setSelectedSlug(personSlug)}
                  className={classNames('', {
                    'has-background-warning': personSlug === selectedSlug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother ? (
                      <PersonLink person={mother} />
                    ) : (
                      motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <PersonLink person={father} />
                    ) : (
                      fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
