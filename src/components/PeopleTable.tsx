import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  errorMessage,
}) => {
  const { slug: selectedSlug } = useParams();

  const findPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name) || null;
  };

  const showNoPeopleMessage =
    !isLoading && !errorMessage && people.length === 0;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {showNoPeopleMessage && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
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
                const mother = findPersonByName(person.motherName);
                const father = findPersonByName(person.fatherName);

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === selectedSlug,
                    })}
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
    </div>
  );
};
