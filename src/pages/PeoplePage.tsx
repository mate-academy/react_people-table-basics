import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    wait(100)
      .then(() =>
        fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        ),
      )
      .then(res => res.json())
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Server Error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : people.length ? (
            <PeopleTable people={people} />
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
