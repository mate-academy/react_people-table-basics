import { useEffect, useState } from 'react';

import { Person } from '../../types/Person';
import { Loader } from '../Loader';

import { getPeople } from '../../api';

export const PeopleTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyPeopleList, setIsEmptyList] = useState(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    const getPeopleList = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        if (!data) {
          setIsEmptyList(true);
        }

        setPeopleList(data);
      } catch {
        setIsLoadingError(true);
      } finally {
        setIsLoading(false);
        setIsLoadingError(false);
        setIsEmptyList(false);
      }
    };

    getPeopleList();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {isLoadingError
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

        {isEmptyPeopleList
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          {!!peopleList.length && (
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
          )}

          <tbody>
            {peopleList.map(person => (
              <tr data-cy="person" key={person.slug}>
                <td>
                  <a href={`#/people/${person.slug}`}>
                    {person.name}
                  </a>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                {person.motherName ? <td>{person.motherName}</td> : <td>-</td>}
                {person.fatherName ? <td>{person.fatherName}</td> : <td>-</td>}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};
