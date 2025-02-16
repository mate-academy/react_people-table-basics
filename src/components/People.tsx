import { Loader } from './Loader';
import { PeopleTable } from './Peopletable';
import { usePeopleData } from '../customHooks/usePeopleData';

export const People = () => {
  const { people, isLoading, error, emptyResponseMessage } = usePeopleData();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {emptyResponseMessage && (
            <p data-cy="noPeopleMessage">{emptyResponseMessage}</p>
          )}

          {!!people.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
