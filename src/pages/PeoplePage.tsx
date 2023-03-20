import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/Loader/PeopleTable';

export const PeoplePage = () => {
  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable selectedSlug={slug} />
    </>
  );
};
