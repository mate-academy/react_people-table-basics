import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const { personName } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable
        selectedPersonName={personName}
      />
    </>
  );
};
