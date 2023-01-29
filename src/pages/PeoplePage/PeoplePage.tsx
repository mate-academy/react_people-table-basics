import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';

type Props = {
  isError: boolean;
  people: Person[];
  isLoaded: boolean;
  loadDate: () => void;
};

export const PeoplePage: React.FC<Props> = ({
  isError,
  people,
  isLoaded,
  loadDate,
}) => {
  const { slug = 0 } = useParams();

  useEffect(() => {
    loadDate();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoaded && <Loader /> }

      <div className="block">
        <div className="box table-container">
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isError && !people.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length && (
            <PeopleTable persons={people} selectedPerson={slug} />
          )}
        </div>
      </div>
    </>
  );
};
