import { useEffect, useState } from 'react';
import * as todoServese from '../../api';
import { Outlet, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { SomethingWentWrong } from '../SomethingWentWrong/SomethingWentWrong';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams<{ slug?: string }>();
  const selectedPerson = slug ? slug : null;

  useEffect(() => {
    todoServese
      .getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (hasError) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {loading ? (
              <Loader />
            ) : (
              <>
                <Outlet />
                <PeopleTable people={people} selectedPerson={selectedPerson} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
