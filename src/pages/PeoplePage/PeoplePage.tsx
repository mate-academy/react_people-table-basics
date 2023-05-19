import { useParams } from 'react-router-dom';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

interface Props {
  people: Person[]
}

export const PeoplePage: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} personSlug={personSlug} />
    </>
  );
};
