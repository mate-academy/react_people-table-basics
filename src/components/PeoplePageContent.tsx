import { usePeople } from '../providers/PeopleProvider';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';
import { PeopleList } from './PeopleList';

export const PeoplePageContent = () => {
  const {
    people, isError, isLoading,
  } = usePeople();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (people) {
    if (people.length) {
      return <PeopleList />;
    }

    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return null;
};
