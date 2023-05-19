import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
  error: string | null;
  isLoading: boolean;
  fetchPeople: () => void;
}

export const PeopleTable: React.FC<Props> = ({
  fetchPeople,
  people,
  isLoading,
  error,
}) => {
  const [selectedPerson, setSelectedPerson] = useState('');

  const handleSetSelectedPerson = (slug: string) => {
    setSelectedPerson(slug);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {error === 'load' && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {isLoading
          ? (<Loader />)
          : (
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
                {people.map(person => (
                  <PersonInfo
                    person={person}
                    selectedPerson={selectedPerson}
                    setSelectedPerson={handleSetSelectedPerson}
                    key={person.slug}
                  />
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
