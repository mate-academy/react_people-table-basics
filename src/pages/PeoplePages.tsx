import { useParams } from 'react-router-dom';
import { TodosTable } from '../components/PeopleTable/PeopleTable';

export const TodosPage = () => {
  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <TodosTable selectedPersonSlug={slug} />
    </>
  );
};
