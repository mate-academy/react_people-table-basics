import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleList } from '../PeopleList';

type Props = {
  people: Person[]
};

export const PeoplePage: React.FC<Props> = ({ people }) => {
  const [loader, setLoader] = useState(false);
  const [noPeople, setNoPeople] = useState(false);

  const noPeopleOnServer = noPeople && people.length === 0;

  const loaderHandler = () => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
      setNoPeople(true);
    }, 500);
  };

  useEffect(() => {
    loaderHandler();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader ? (
            <Loader />
          ) : (
            <>
              <PeopleList people={people} />
              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
