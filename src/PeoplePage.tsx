import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { Person } from './types';

interface Props {
  people: Person[];
}
export const PeoplePage: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  return (
    <>
      {people.length !== 0 && (
        <>
          <h1 className="title">People Page</h1>
          <PeopleTable people={people} selectedPerson={slug} />
        </>
      )}
    </>
  );
};
