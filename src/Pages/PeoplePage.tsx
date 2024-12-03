import { PeopleList } from '../components/PeopleList';
import { usePeople } from '../store/PeopleContext';

export const PeoplePage = () => {
  const people = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleList people={people} />
    </>
  );
};
