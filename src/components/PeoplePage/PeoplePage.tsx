import { PeopleError } from '../../types/enums';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { usePeople } from '../context/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { isLoading, errorMessage, people } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {!isLoading && errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {PeopleError.requestErrorDisplay}
        </p>
      )}
      {!isLoading && !errorMessage && !!people.length && <PeopleTable />}
      {!isLoading && (!people.length || errorMessage) && (
        <p data-cy="noPeopleMessage">{PeopleError.noPeopleMessage}</p>
      )}
    </>
  );
};
