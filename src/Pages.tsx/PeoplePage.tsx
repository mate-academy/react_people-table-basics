import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable.tsx';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [loading, setLoading] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [dropError, setDropError] = useState(false);

  useEffect(() => {
    setShowPeople(false);
    setLoading(true);
    setDropError(false);
    const fetchPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
        setLoading(false);
        setShowPeople(true);
      } catch (error) {
        setLoading(false);
        setDropError(true);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {showPeople && (
        !people.length ? (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        ) : (
          <PeopleTable people={people} selectedPerson={slug} />
        )
      )}

      {loading && <Loader /> }
      {dropError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </>
  );
};
