import { Person } from '../types/Person';
import { Error } from '../components/Error';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

type Props = {
  people: Person[],
  error: string,
};

export const PeoplePage: React.FC<Props> = ({ people, error }) => {
  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      {people.length === 0
        && <Loader />}

      <div className="block">
        <div className="box table-container">

          {error
            ? <Error error={error} />
            : <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
