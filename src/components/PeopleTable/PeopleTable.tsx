import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getPeople } from '../../api';
import { Person } from '../../types';

import { Loader } from '../Loader';
import PersonInfo from '../PersonInfo/PersonInfo';

const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { personSlug = '' } = useParams();

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherLink = people
            .find(mother => mother.name === person.motherName) || null;
          const fatherLink = people
            .find(father => father.name === person.fatherName) || null;

          return (
            <PersonInfo
              key={person.slug}
              person={person}
              personSlug={personSlug}
              motherLink={motherLink}
              fatherLink={fatherLink}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
