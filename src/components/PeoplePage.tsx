import { useEffect, useState } from 'react';
import PeopleTable from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const getAllPeople = async () => {
      try {
        setLoading(true);
        const response = await getPeople();

        setPeople(response);

        setLoading(false);

        return response;
      } catch (error) {
        setErrorMessage(true);

        return;
      }
    };

    getAllPeople();
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      {errorMessage === true ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        <PeopleTable person={people} loading={loading} />
      )}
    </div>
  );
};

export default PeoplePage;
