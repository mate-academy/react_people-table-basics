import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { NoPeopleMessage } from '../components/NoPeopleMessage';
import { PeopleLoadingError } from '../components/PeopleLoadingError';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const { slug = '' } = useParams();

  const fetchPeoples = async () => {
    try {
      const peoplesFromServer = await getPeople();

      setPeoples(peoplesFromServer);
    } catch {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  const isArrayEmpty = peoples && !peoples.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {peoples ? (
            <PeopleTable selectedSlug={slug} peoples={peoples} />
          ) : (
            <Loader />
          )}

          {isArrayEmpty && (
            <NoPeopleMessage />
          )}

          {hasError && (
            <PeopleLoadingError />
          )}
        </div>
      </div>
    </>
  );
};
