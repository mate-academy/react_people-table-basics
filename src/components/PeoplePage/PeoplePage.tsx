import { useParams } from 'react-router-dom';
import { PeopleList } from '../PeopleList';
import { usePeopleContext } from '../../hooks/usePeopleContext';
import { Loader } from '../Loader';
import { useEffect } from 'react';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const {
    people,
    setPeople,
    isLoading,
    setIsLoading,
    hasLoadingError,
    setHasLoadingError,
  } = usePeopleContext();
  const { slug } = useParams();
  const selectedPerson =
    (slug && people.find(person => person.slug === slug)) || null;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setHasLoadingError(false);

        const peopleWithParents = peopleFromServer.map(person => {
          const mother = peopleFromServer.find(
            parent => parent.name === person.motherName,
          );
          const father = peopleFromServer.find(
            parent => parent.name === person.fatherName,
          );

          return { ...person, mother, father };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && hasLoadingError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!hasLoadingError && !isLoading && !!people.length && (
        <PeopleList selectedPerson={selectedPerson} />
      )}

      {!hasLoadingError && !isLoading && !people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};
