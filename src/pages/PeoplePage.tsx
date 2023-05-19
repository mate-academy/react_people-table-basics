import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { Person } from '../types';

type Props = {
  people: Person[]
  isLoading: boolean,
  isError: boolean,
};

export const PeoplePage: React.FC<Props> = ({ people, isLoading, isError }) => {
  const { personSlug = '' } = useParams();

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {!isLoading && isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!people.length && !isLoading) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        <div className="block">
          <div className="box table-container">

            {!isLoading && !isError && (
              <PeopleList
                people={people}
                selectedPerson={personSlug}
              />
            )}
          </div>
        </div>

      </div>
    </main>
  );
};
