import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const { personSlug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <PeopleTable personSlug={personSlug} />
      </div>

    </>
  );
};
