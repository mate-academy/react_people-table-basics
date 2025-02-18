import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import PeopleTable from '../components/PeopleTable';

export const PeoplePage = () => {
  const { personSlug } = useParams<{ personSlug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            <PeopleTable people={people} personSlug={personSlug} />
          </div>
        </div>
      </div>
    </>
  );
};
