import { useParams } from 'react-router-dom';
import { Peoples } from './Peoples';

export const PeoplePage: React.FC = () => {
  const { selectedPerson } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <Peoples selectedPerson={selectedPerson as string} />
    </>
  );
};
