import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { findMother, findFather } from '../../Utils';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { personSlug } = useParams();

  useEffect(() => {
    setIsTableLoading(true);
    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsTableLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isTableLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people?.length && !isTableLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {people?.length && (
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
                {people?.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn(
                      { 'has-background-warning': person.slug === personSlug },
                    )}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {findMother(people, person.motherName)
                        ? (
                          <PersonLink person={findMother(
                            people, person.motherName,
                          )}
                          />
                        )
                        : (
                          person.motherName
                        )
                        || '-'}
                    </td>
                    <td>
                      {findFather(people, person.fatherName)
                        ? (
                          <PersonLink person={findFather(
                            people,
                            person.fatherName,
                          )}
                          />
                        )
                        : (
                          person.fatherName
                        )
                        || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};
