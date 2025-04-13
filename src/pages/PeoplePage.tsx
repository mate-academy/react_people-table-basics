import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable selectedSlug={slug} />
    </>
  );
};
