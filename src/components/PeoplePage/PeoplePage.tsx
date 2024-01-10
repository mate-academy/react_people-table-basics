import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleList } from './PeopleList/PeopleList';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';

function getParentByName(name: string | null, peopleArray: Person[]) {
  const parent = peopleArray.find(person => person.name === name);

  return parent || null;
}

export const PeoplePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasServerError, setHasServerError] = useState(false);
  const { personSlug = '' } = useParams<Person['slug'] | ''>();

  const getPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents = peopleFromServer.map(person => {
        const personWithParents = { ...person };
        const mother = getParentByName(person.motherName, peopleFromServer);
        const father = getParentByName(person.fatherName, peopleFromServer);

        if (mother) {
          personWithParents.mother = mother;
        }

        if (father) {
          personWithParents.father = father;
        }

        return personWithParents;
      });

      setPeople(peopleWithParents);
    } catch {
      setHasServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const peopleExist = people.length > 0;
  const noPeopleOnServer = !peopleExist && !isLoading && !hasServerError;

  return (
    <div className="container">
      <h1 className="title is-1">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasServerError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong!
            </p>
          )}

          {noPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {peopleExist && (
            <PeopleList people={people} selectedPersonSlug={personSlug} />
          )}
        </div>
      </div>
    </div>
  );
};
