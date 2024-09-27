import { useEffect,useState } from 'react';
import { getPeople } from './api';
import { PeopleTable } from './PeopleTable';
import { Person } from './types';
import { Loader } from './components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
  setLoader(true)
  setError(false)
     getPeople()
     .then(setPeople)
     .catch(() => setError(true))
     .finally(()=>setLoader(false))
  }, [])


  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!people.length && !error && !loader && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !error && !loader && (
            <PeopleTable people={people}/>
          )}
        </div>
      </div>
    </div>
  );
}
