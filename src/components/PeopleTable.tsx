import { useContext, useLayoutEffect, useState } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { getAllPeople, URL } from '../utils/fethcClient';
import { PersonComponent } from './PersonComponent';
import { Loader } from './Loader/Loader';

export const PeopleTable = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    (() => {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const allPeople = await getAllPeople(URL);

          setPeople(allPeople);
        } catch {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }

        setIsLoading(false);
      }, 1000);
    })();
  }, [setPeople]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (!isLoading && people.length === 0) {
    content = (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  } else if (!isLoading && people.length !== 0) {
    content = (
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
          {people.map((person) => (
            <PersonComponent person={person} key={Math.random()} />
          ))}
        </tbody>
      </table>
    );
  }

  return <>{content}</>;
};
