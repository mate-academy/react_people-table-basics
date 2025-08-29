import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

type Props = {
  people: Person[];
  loading: boolean;
  error: boolean;
};

export const PeoplePage = ({ people, loading, error }: Props) => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
