import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { PersonList } from '../PersonList';
import { Loader } from '../Loader';

import { ErrorType } from '../../types/ErrorType';
import { Person } from '../../types/Person';
import { groupedPeopleData } from '../../utils/groupedPeopleData';

export const PeopleTable = () => {
  const { personId = 'no selected' } = useParams();

  const [dataPeople, setDataPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.none);

  const loadDataFromServer = async () => {
    try {
      const dataFromServer = await getPeople();

      if (!dataFromServer.length) {
        setErrorType(ErrorType.emptyData);
      }

      setDataPeople(groupedPeopleData(dataFromServer));
    } catch (error) {
      setErrorType(ErrorType.loadingData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && (
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
                {dataPeople.map(person => (
                  <PersonList
                    person={person}
                    key={person.slug}
                    selectedPerson={personId}
                  />
                ))}
              </tbody>
            </table>
          )}

          {errorType === ErrorType.loadingData && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {errorType === ErrorType.emptyData && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        </div>
      </div>
    </>
  );
};
