import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonList } from '../PersonList';

export const PersonPage = () => {
  const [personas, setPersonas] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const { slug = '' } = useParams();

  const getPersonasFromServer = async () => {
    try {
      const serverData = await getPeople();

      setPersonas(serverData);
    } catch {
      // console.log('data didnt download from server');
      setIsError(true);
    }
  };

  useEffect(() => {
    getPersonasFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {/* <Loader /> */}

          {isError
            ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <PersonList personas={personas} selectedPersonId={slug} />
            ) }

          {!personas.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
