import { useContext } from 'react';
import { PeopleList } from '../components/PeopleList';
import { PeopleContext } from '../contexts/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { people } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleList people={people} />
    </>
  );
};
