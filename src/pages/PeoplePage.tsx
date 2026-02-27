import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  if (loading) {
    return (
      <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
           <Loader />
        </div>
      </div>
      </>
    )
  }

  if (errorMessage) {
    return (
      <>
      <h1 className="title">People Page</h1>

      <div className="block">
         <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
      </div>
      </>
    )
  }

  if(people.length === 0) {
    return (
       <>
      <h1 className="title">People Page</h1>

      <div className="block">
         <p data-cy="noPeopleMessage">There are no people on the server</p>
      </div>
      </>
    )
  }
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
         <PeopleTable people={people} />

        </div>
      </div>
    </>
  );
};
