import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  isLoading: boolean;
  error: string;
}

export const PeopleTable: React.FC<Props> = ({ people, isLoading, error }) => {
  const { personSlug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {error}
            </p>
            {people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
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
                {people.map((person) => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === personSlug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother && (
                        <PersonLink person={person.mother} />
                      )}
                      {person.motherName && !person.mother && (
                        <p>{person.motherName}</p>
                      )}
                      {!person.motherName && '-'}
                    </td>
                    <td>
                      {person.father && (
                        <PersonLink person={person.father} />
                      )}
                      {person.fatherName && !person.father && (
                        <p>{person.fatherName}</p>
                      )}
                      {!person.fatherName && '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
