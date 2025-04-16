import React, { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import PeopleTable from './PeopleTable';
import { useParams } from 'react-router-dom';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const { selectedSlug } = useParams();

  const fetchPeople = async () => {
    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch (e) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const nameToSlugMap = useMemo(() => {
    if (!people) {
      return new Map();
    }

    return new Map(people.map(p => [p.name, p.slug]));
  }, [people]);

  if (isError) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          </div>
        </div>
      </>
    );
  }

  if (people?.length === 0) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {people ? (
            <PeopleTable
              people={people}
              selectedSlug={selectedSlug || ''}
              nameToSlugMap={nameToSlugMap}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
