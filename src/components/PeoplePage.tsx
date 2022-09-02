import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [arePeopleLoading, setArePeopleLoading] = useState(false);
  const [didLoadingHappen, setDidLoadingHappen] = useState(false);
  const [somethingWrong, setSomethingWrong] = useState(false);

  useEffect(() => {
    setArePeopleLoading(true);
    getPeople()
      .then(gotPeople => {
        setPeople(gotPeople);
      })
      .catch(() => {
        setSomethingWrong(true);
      })
      .finally(() => {
        setArePeopleLoading(false);
        setDidLoadingHappen(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {!somethingWrong && people.length > 0 && (
        <PeopleTable people={people} selectedPersonSlug={slug} />
      )}

      <div className="block">
        <div className="box table-container">
          {arePeopleLoading && <Loader />}

          {somethingWrong && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {didLoadingHappen && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        </div>
      </div>
    </>
  );
};
