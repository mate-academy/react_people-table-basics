import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';
import { Loader } from '../Loader';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedSlug?: string;
  loading: boolean;
  error?: string | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  loading,
  error,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !error && people.length > 0 && (
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
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': person.slug === selectedSlug,
                  })}
                >
                  <td>
                    <PersonLink person={person} people={people} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      <PersonLink
                        personName={person.motherName}
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      <PersonLink
                        personName={person.fatherName}
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
