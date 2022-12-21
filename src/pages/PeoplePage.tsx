import { useParams } from 'react-router-dom';
import { PersonTable } from '../components/PersonTable';

export const PeoplePage = () => {
  const { personSlug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <PersonTable selectedPerson={personSlug} />
    </>
  );
};
