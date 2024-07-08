import { Person } from '../../types';
import { PeopleList } from './PeopleList';

type PeoplePageProps = {
  people: Person[];
  error: boolean;
  loadingPeople: boolean;
};

export const PeoplePage: React.FC<PeoplePageProps> = ({
  loadingPeople,
  error,
  people,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleList loadingPeople={loadingPeople} error={error} people={people} />
    </>
  );
};
