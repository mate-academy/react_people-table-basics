import { Loader } from '../Loader';
import { ErrorNotification } from '../../shared/ErrorNotification';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { usePeople } from '../../hooks/usePeople';

export const People = () => {
  const { people, isLoading, error } = usePeople();

  const isPeopleEmpthy = !people.length && !isLoading;

  const getPeopleView = () => {
    if (error) {
      return (
        <ErrorNotification dataCy="peopleLoadingError" errorMessage={error} />
      );
    }

    if (isPeopleEmpthy) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    if (!!people.length) {
      return <PeopleTable people={people} />;
    }

    return null;
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {getPeopleView()}
      </div>
    </div>
  );
};
