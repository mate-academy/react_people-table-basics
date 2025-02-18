import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api/people';
import { Person } from '../types';
import { getPeopleWithParents } from '../utils/listOfPeopleWithParents';
import { PersonList } from '../components/PersonList';

const People = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [noPeople, setNoPeople] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(response => {
        if (!response.length) {
          setNoPeople(true);

          return;
        }

        const people = getPeopleWithParents(response);

        setPeopleList(people);
      })
      .catch(() => {
        setError(true);
        setNoPeople(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (error) {
      timer = setTimeout(() => {
        setError(false);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!peopleList.length && <PersonList people={peopleList} />}
        </div>
      </div>
    </>
  );
};

export default People;
