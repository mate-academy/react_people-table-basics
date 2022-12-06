import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleList } from '../PeopleList';

type Props = {
  people: Person[]
};

export const PeoplePage: React.FC<Props> = ({ people }) => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {people.length === 0 && (
            <Loader />
          )}

          <PeopleList
            people={people}
          />
        </div>
      </div>
    </>
  );
};
