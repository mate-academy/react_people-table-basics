import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { findParentByName } from '../../utiles/findParentByName';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeoplesTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const fetchPeople = async () => {
    setIsLoaded(true);
    try {
      const peopleFromServer = await getPeople();
      const prepearedPeople = peopleFromServer.map(person => {
        const mother = findParentByName(peopleFromServer, person.motherName);
        const father = findParentByName(peopleFromServer, person.fatherName);

        return { ...person, mother, father };
      });

      setPeople(prepearedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isPeopleFromServer = !isLoaded && people.length === 0;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoaded && <Loader /> }

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length > 0 && (
          <PeopleTable
            people={people}
            selectedSlug={slug}
          />
        )}

        {isPeopleFromServer && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

      </div>
    </div>
  );
};
