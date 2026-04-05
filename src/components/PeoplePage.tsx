import '../styles/PeoplePage.scss';
import { Person } from '../types';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import PeopleTable from './PeopleTable';

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setErrorMsg('Something went wrong. Try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (errorMsg) {
    return (
      <div className="people-page">
        <h1 className="title">People Page</h1>
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMsg}
          </p>
        </div>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="people-page">
        <h1 className="title">People Page</h1>
        <div className="box table-container">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="people-page">
        <h1 className="title">People Page</h1>
        <div className="box table-container">
          <PeopleTable people={people} />
        </div>
      </div>
    );
  }
}
