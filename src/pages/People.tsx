import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const People = () => {
  const { personSlug } = useParams<{ personSlug?: string }>();
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    personSlug || null,
  );

  useEffect(() => {
    setTimeout(() => {
      fetch('https://mate-academy.github.io/react_people-table/api/people.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }

          return response.json();
        })
        .then(data => {
          setPeople(data);
          setErrorMessage(null);
          setIsLoading(false);
        })
        .catch(error => {
          setErrorMessage(error.message || 'Something went wrong');
          setIsLoading(false);
        });
    }, 10);
  }, []);

  useEffect(() => {
    setSelectedSlug(personSlug || null);
  }, [personSlug]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !errorMessage && (
                <PeopleTable
                  people={people}
                  selectedSlug={selectedSlug}
                  onSelect={setSelectedSlug}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
