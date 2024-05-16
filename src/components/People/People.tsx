import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';

export const People = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!people?.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="
                    table
                    is-striped
                    is-hoverable
                    is-narrow
                    is-fullwidth
                  "
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
                    {people?.map(person => {
                      const mother = people.find(
                        possibleMother =>
                          possibleMother.name === person.motherName,
                      );
                      const father = people.find(
                        possibleFather =>
                          possibleFather.name === person.fatherName,
                      );
                      const modifiedPerson = { ...person, mother, father };

                      return (
                        <PersonLink person={modifiedPerson} key={person.slug} />
                      );
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
