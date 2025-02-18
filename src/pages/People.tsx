import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getAllPeople } from '../api/people';
import { Person } from '../types';
import { listOfPeopleWithParents } from '../helpers/listOfPeopleWithParents';
import { PersonList } from '../components/PersonList';

const People = () => {
  const [listOfPeople, setListOfPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [noPeopleMessage, setNoPeopleMessage] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllPeople('/people.json')
      .then(response => {
        if (!response.length) {
          setNoPeopleMessage(true);

          return;
        }

        const people = listOfPeopleWithParents(response);

        setListOfPeople(people);
      })
      .catch(() => {
        setError(true);
        setNoPeopleMessage(true);
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

          {noPeopleMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!listOfPeople.length && <PersonList people={listOfPeople} />}
        </div>
      </div>
    </>
  );
};

export default People;
