import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response.map(person => {
        const result = { ...person };

        result.mother = response
          .find(currentPerson => currentPerson.name === person.motherName);

        result.father = response
          .find(currentPerson => currentPerson.name === person.fatherName);

        return result;
      })))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const getContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!people.length) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return <PeopleTable people={people} slug={slug} />;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {getContent()}
        </div>
      </div>
    </>
  );
};
