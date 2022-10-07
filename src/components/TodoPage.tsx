import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

interface Props {
  peopleTable: Person[],
}
export const TodoPage: React.FC<Props> = ({ peopleTable }) => {
  const { slug = 'carolus-haverbeke-1832' } = useParams();

  return (
    (
      <>
        <h1 className="title">People Page</h1>
        <PeopleTable
          peopleTable={peopleTable}
          slugPersone={slug}
        />
      </>
    )
  );
};
