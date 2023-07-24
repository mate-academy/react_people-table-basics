import { useParams } from 'react-router-dom';
import { People } from './People';

export const PeoplePage: React.FC = () => {
  const { selectedPerson } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <People selectedPerson={selectedPerson as string} />
    </>
  );
};
