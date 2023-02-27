import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { PersonList } from '../PersonList';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const { slug = '' } = useParams();

  const getPeoplesFromServer = async () => {
    try {
      const peoples = await getPeople();

      setPersons(peoples);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    getPeoplesFromServer();
  }, []);

  return (
    !errorMessage
      ? (
        <>
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="box table-container">
              {!isLoaded && <Loader />}

              {isLoaded && (
                <PersonList
                  persons={persons}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </>
      )
      : (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )
  );
};
