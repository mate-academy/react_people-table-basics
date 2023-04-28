import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleList } from '../components/PeopleList/PeopleList';
import { Loader } from '../components/Loader';
import { TableHeaders } from '../utils/TableHeaders';

export const PeopleTable: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPeople = async () => {
    try {
      const people = await getPeople();

      setPeopleList(people);
    } catch {
      setErrorMessage('No internet connection');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  if (errorMessage) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError">{errorMessage}</p>
          </div>
        </div>
      </>
    );
  }

  if (peopleList.length === 0 && !isLoading) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <>
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="box table-container">
              <Loader />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="box table-container">
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    {TableHeaders.map(header => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <PeopleList people={peopleList} />
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
