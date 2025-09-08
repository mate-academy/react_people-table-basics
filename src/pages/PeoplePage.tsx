import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage = () => {
  const { people, isLoading, error } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} isLoading={isLoading} error={error} />
    </>
  );
};
