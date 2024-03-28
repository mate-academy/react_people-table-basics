import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

type Props = {
  people: Person[];
  loading: boolean;
  errorMessage: string;
};

export const PeoplePage: React.FC<Props> = ({
  people,
  loading,
  errorMessage,
}) => (
  <>
    <h1 className="title">People Page</h1>

    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!!people.length && <PeopleTable people={people} />}

        {!people.length && !loading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
      </div>
    </div>
  </>
);
