import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { ErrorType } from '../../types/ErrorType';

const complementPeopleList = (people: Person[]) => {
  return people.map((person) => (
    {
      ...person,
      father: people.find(father => person.fatherName === father.name),
      mother: people.find(mother => person.motherName === mother.name),
    }
  ));
};

export const PeoplePage = () => {
  const { slug = '' } = useParams();

  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.none);

  useEffect(() => {
    (async () => {
      try {
        const people = await getPeople();

        if (!people.length) {
          setErrorType(ErrorType.emptyList);
        }

        setPeopleList(complementPeopleList(people));
      } catch (err) {
        setErrorType(ErrorType.loading);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(errorType === ErrorType.none && !isLoading) && (
            <PeopleTable peopleList={peopleList} selectedPersonSlug={slug} />
          )}

          {errorType === ErrorType.loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {errorType === ErrorType.emptyList && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
