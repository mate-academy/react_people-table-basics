/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople().then((res) => {
      setPeople(res);
      setIsLoading(false);
    }).catch(() => {
      setHasError(true);
    });
  }, []);

  const peopleElements = people?.map(person => {
    const {
      name,
      sex,
      born,
      died,
      motherName,
      fatherName,
      slug,
    } = person;

    return (
      <tr data-cy="person" key={slug}>
        <td>
          <a href="#/people/jan-van-brussel-1714">
            {name}
          </a>
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{motherName || '-'}</td>
        <td>{fatherName || '-'}</td>
      </tr>
    );
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : people?.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
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

              <tbody>{peopleElements}</tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};
