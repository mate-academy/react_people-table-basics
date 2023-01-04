import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(ppl => {
        setLoading(false);
        setPeople(ppl.map(person => ({
          ...person,
          mother: ppl
            .find(mother => mother.name === person.motherName),
          father: ppl
            .find(father => father.name === person.fatherName),
        })));
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      </>
    );
  }

  if (!loading && !people.length) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {loading
            ? <Loader />
            : <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
