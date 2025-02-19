import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../../types/Person';
import { getPeople } from '../../../api';
import { People } from '../People/People';
import { useParams } from 'react-router-dom';

export const PeopleList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const { personId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setPeople([]);

    getPeople()
      .then(data => {
        const dataWithParents = data.map(person => {
          const foundFather = data.find(
            findingFather => findingFather.name === person.fatherName,
          );
          const foundMother = data.find(
            findingMother => findingMother.name === person.motherName,
          );

          return {
            ...person,
            mother: foundMother || undefined,
            father: foundFather || undefined,
          };
        });

        setPeople(dataWithParents);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (personId) {
      setSelectedPerson(personId);
    }
  }, [personId]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <>
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          </>
        )}

        {!isLoading && !people?.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people && people.length !== 0 && (
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
                return (
                  <People
                    key={person.slug}
                    person={person}
                    onSelect={setSelectedPerson}
                    selectedPerson={selectedPerson}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
