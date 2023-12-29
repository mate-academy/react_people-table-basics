import {
  FC, useEffect, useState,
} from 'react';

import { getPeople } from '../../api';
import { Person as PersonType } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { Loader } from '../Loader';

export const PeopleTable: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [peoples, setPeople] = useState<PersonType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const findPersonByName = (name: string) => {
    const result = peoples.find(item => item.name === name);

    return result?.slug;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">

          {
            !isLoading
              ? (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}
                  {peoples.length === 0
                    ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )
                    : (
                      <table
                        data-cy="peopleTable"
                        className="
                          table
                          is-striped
                          is-hoverable
                          is-narrow
                          is-fullwidth"
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
                            return (
                              <PersonLink
                                person={person}
                                key={person.slug}
                                findSlug={findPersonByName}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    )}

                </>
              )
              : <Loader />
          }

        </div>
      </div>
    </>
  );
};
