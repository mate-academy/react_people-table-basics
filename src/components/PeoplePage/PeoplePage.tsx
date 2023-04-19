import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

const findParent = (
  array: Person[], parentName: string | null,
): Person | undefined => {
  return array.find(parent => parent.name === parentName);
};

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const getPeopleFromServer = async () => {
      try {
        const peopleFromServer = await getPeople();
        const peopleWithParents = peopleFromServer.map(person => ({
          ...person,
          mother: findParent(peopleFromServer, person.motherName),
          father: findParent(peopleFromServer, person.fatherName),
        }));

        setPeople(peopleWithParents);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <>
                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {people.length <= 0 && !isError && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!isError && people.length > 0 && (
                  <PeopleTable people={people} personId={slug} />
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
