import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import PeopleTable from './PeopleTable';

const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);

  const handleGetPeople = async () => {
    try {
      setIsLoading(true);
      const data = await getPeople();

      const dataWithParents = data.map(person => {
        return {
          ...person,
          mother: data.find(anyone => anyone.name === person.motherName),
          father: data.find(anyone => anyone.name === person.fatherName),
        };
      });

      setPeople(dataWithParents);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetPeople();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="block">
        <h1 className="title">People Page</h1>

        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {people.length === 0 ? (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        ) : (
          <PeopleTable people={people} />
        )}
      </div>
    </div>
  );
};

export default PeoplePage;
