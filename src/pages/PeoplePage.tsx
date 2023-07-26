import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/People/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { selectedPerson } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable selectedPerson={selectedPerson as string} />
    </>
  );
};
