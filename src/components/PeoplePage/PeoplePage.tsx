import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const { slug } = useParams();
  let content;

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(resPeople => setPeople(resPeople))
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    content = <Loader />;
  } else if (loadingError) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong ...
      </p>
    );
  } else if (people.length === 0) {
    content = <p data-cy="noPeopleMessage">No people on server</p>;
  } else {
    content = <PeopleTable people={people} selectedSlug={slug} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">{content}</div>
      </div>
    </>
  );
};
