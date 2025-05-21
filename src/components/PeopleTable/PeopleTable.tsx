import React from 'react';
import { Loader } from '../Loader';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  peoples: Person[];
  error: boolean;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({ peoples, error, isLoading }) => {
  const { slug } = useParams();

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!error && !isLoading && peoples.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && peoples && (
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
            {peoples.map(person => {
              const mother = peoples.find(
                peop => peop.name === person.motherName,
              );
              const father = peoples.find(
                peop => peop.name === person.fatherName,
              );

              return (
                <tr
                  key={person.slug}
                  className={
                    slug === person.slug ? 'has-background-warning' : ''
                  }
                  data-cy="person"
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {mother ? (
                      <PersonLink person={mother} />
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>

                  <td>
                    {father ? (
                      <PersonLink person={father} />
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
