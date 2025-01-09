import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { slug } = useParams();

  const selectedPerson = slug
    ? people.find(person => person.slug === slug)
    : null;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <PeopleTable
          people={people}
          selectedPerson={selectedPerson}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};
