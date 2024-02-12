import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { PeopleContext } from '../store/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { loader } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!loader ? (
            <PeopleList />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
