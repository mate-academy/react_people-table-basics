import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleList } from '../PeopleList/PeopleList';
import { Loader } from '../Loader';

// type Props = {
//   people: Person[];
//   personSlug?: string;
// };

export const PeopleTable: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPeople = async () => {
    try {
      // setIsLoading(true);

      const people = await getPeople();

      setPeopleList(people);
    } catch {
      setErrorMessage('No ethernet connection');
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
              {/* <Loader />

          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p> */}

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
