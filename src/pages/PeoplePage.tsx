import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [allPeople, setAllPeople] = useState<Person[] | null>(null);
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setShowLoading(true);
    getPeople()
      .then(people => {
        setAllPeople(people);
      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {showLoading && <Loader />}

          {showError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {allPeople && allPeople.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {allPeople && allPeople.length > 0 && (
            <PeopleTable allPeople={allPeople} slug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};
