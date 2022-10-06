import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { Loader } from '../Loader';
import { PersonLink } from './PersonLink';

export const PeopleList = () => {
  const [select, setSelect] = useState<string>('');
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadPeople = () => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const findParents = (
    parentName: string | null,
  ): string | JSX.Element | null => {
    const parentObj = people?.find(({ name }) => name === parentName);

    return parentObj
      ? (
        <PersonLink
          person={parentObj}
          setSelectedSlug={setSelect}
        />
      )
      : parentName;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {(!people && !errorMessage.length) && (
            <Loader />
          )}

          {errorMessage.length > 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {(people && people?.length > 0) && (
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
                    className={classNames(
                      { 'has-background-warning': select === person.slug },
                    )}
                    key={person.slug}
                  >
                    <td>
                      <PersonLink
                        person={person}
                        setSelectedSlug={setSelect}
                      />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {findParents(person.motherName) || '-'}
                    </td>
                    <td>
                      {findParents(person.fatherName) || '-'}
                    </td>
                  </tr>
                ))}
                {(people && people?.length === 0) && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
