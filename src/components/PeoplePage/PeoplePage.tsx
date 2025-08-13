import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (slug) {
      setSelectedSlug(slug);
    }
  }, [slug]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isErrorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && !isErrorMessage && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        <h1 className="title">People Page</h1>

        {!isLoading && !isErrorMessage && people.length > 0 && (
          <PeopleTable
            people={people}
            selectedSlug={selectedSlug}
            onSelectPerson={setSelectedSlug}
          />
        )}
      </div>
    </div>
  );
};
