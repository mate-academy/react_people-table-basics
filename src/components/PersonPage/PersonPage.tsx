import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonList } from '../PersonList';

export const PersonPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();
  const getPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      const serverData = await getPeople();
      const addParents = serverData.map(person => {
        const mother: Person | null
          = serverData.find(mom => mom.name === person.motherName) || null;
        const father: Person | null
          = serverData.find(dad => dad.name === person.fatherName) || null;

        return { ...person, mother, father };
      });

      setPeople(addParents);
    } catch {
      // console.log('data didnt download from server');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {/* <Loader /> */}
          { isLoading
            ? (<Loader />)
            : (
              <>
                {isError
                  ? (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  ) : (
                    <PersonList people={people} selectedPersonId={slug} />
                  ) }

                {!people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
