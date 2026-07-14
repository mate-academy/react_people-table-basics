import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const content = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (people.length === 0) {
      return (
        <p data-cy="noPeopleMessage"> There are no people on the server</p>
      );
    }

    return <PeopleTable people={people} selectedSlug={slug} />;
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        {content()}
      </div>
    </div>
  );
};
