import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPeople = async () => {
    setIsLoading(true);
    try {
      const data = await getPeople();

      const getParent = (parent: string | null) => {
        return data.find(pers => pers.name === parent);
      };

      const peopleWithParents = data.map(person => ({
        ...person,
        mother: getParent(person.motherName),
        father: getParent(person.fatherName),
      }));

      setPeople(peopleWithParents);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isSomethingWrong = !people.length && isError;
  const areNoPeopleOnServer = !people.length && !isError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {(isLoading
            && (<Loader />))}

          {isSomethingWrong
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {areNoPeopleOnServer
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {people.length !== 0
            && <PeopleTable people={people} slug={slug} />}

        </div>
      </div>
    </>
  );
};
