import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Error } from '../types/Error';

const visiblePeople = (people: Person[]) => {
  return people.map((person) => ({
    ...person,
    father: people.find((father) => person.fatherName === father.name),
    mother: people.find((mother) => person.motherName === mother.name),
  }));
};

export const PeoplePage:FC = () => {
  const { slug = '' } = useParams();

  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(Error.none);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((people) => {
        if (!people.length) {
          setError(Error.emptyList);
        }

        setPeopleList(visiblePeople(people));
      })
      .catch(() => setError(Error.loading))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(error === Error.none && !isLoading) && (
            <PeopleTable peopleList={peopleList} selectedPersonSlug={slug} />
          )}

          {error === Error.loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {error === Error.emptyList && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
