import { Loader } from './components/Loader';
import { Person } from './types';

interface LoadingErrorProps {
  isLoading: boolean;
  usersArr: Person[];
}

export const LoadingError:React.FC<LoadingErrorProps> = ({
  isLoading, usersArr,
}) => (
  <div className="block">
    <div className="box table-container">
      {isLoading && <Loader />}

      {!usersArr.length && (

        <>
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>

        </>
      )}

    </div>
  </div>
);
