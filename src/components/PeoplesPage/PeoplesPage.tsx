import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { findParentByName } from '../../utiles/findParentByName';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeoplesTable';

export const PeoplesPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const fetchPeople = async () => {
    setIsLoaded(true);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
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

  const prepearedPeople = people.map(person => {
    const mother = findParentByName(people, person.motherName);
    const father = findParentByName(people, person.fatherName);

    return { ...person, mother, father };
  });

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
            people={prepearedPeople}
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
