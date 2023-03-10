import { Person } from '../types';
import { Loader } from './Loader';

interface Props {
  isLoading: boolean,
  isError: boolean,
  peopleTable: Person[]
}

export const MessageBlock: React.FC<Props> = ({
  isLoading,
  isError,
  peopleTable,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (<Loader />)}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isError && !isLoading && peopleTable.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
