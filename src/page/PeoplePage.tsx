import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import PeopleTable from '../Components/PeopleTable';
import { Loader } from '../Loader/Loader';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();
        const peopleWithParents = data.map(person => {
          const mother = data.find(p => p.name === person.motherName) || null;
          const father = data.find(p => p.name === person.fatherName) || null;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
      } catch (error) {
        setPeople([]);
        setLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (isLoading) {
    return <Loader data-cy="loader" />;
  }

  return (
    <div>
      <h1 className="title">People Page</h1>
      {loadingError && (
        <p data-cy="peopleLoadingError" className="error-message">
          There was an error loading the people. Please try again later.
        </p>
      )}
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
