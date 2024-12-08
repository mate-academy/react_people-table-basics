import 'bulma/css/bulma.css';
import { Loader } from '../components/Loader';
import Table from '../components/Table';
import { usePeople } from '../hooks/usePeople';

const PeoplePage = () => {
  const { people, isPeopleLoading, isPeopleError } = usePeople();

  let status = 'loading';

  if (isPeopleError) {
    status = 'error';
  } else if (!isPeopleLoading && people.length > 0) {
    status = 'loaded';
  } else if (!isPeopleLoading && people.length === 0) {
    status = 'empty';
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {status === 'loading' && <Loader />}

          {status === 'error' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {status === 'loaded' && <Table people={people} />}

          {status === 'empty' && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
