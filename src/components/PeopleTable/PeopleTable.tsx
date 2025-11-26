import { Person } from '../../types/Person';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const { slug } = useParams();

  function loadPeople() {
    setLoading(true);
    setErrorMessage('');
    setIsErrorVisible(false);
    getPeople()
      .then(data => {
        setPeople(data);

        if (data.length === 0) {
          setErrorMessage('There are no people on the server');
          setIsErrorVisible(true);
          setTimeout(() => setIsErrorVisible(false), 4000);
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 4000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadPeople, []);

  useEffect(() => {
    if (slug) {
      setSelectedSlug(slug);
    }
  }, [slug]);

  return (
    <>
      {people.length > 0 && !loading && (
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
            {people.map((person: Person) => (
              <tr
                data-cy="person"
                key={person.slug}
                className={
                  selectedSlug?.trim() === person.slug.trim()
                    ? 'has-background-warning'
                    : ''
                }
              >
                <td>
                  <PersonLink personName={person.name} people={people} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  <PersonLink personName={person.motherName} people={people} />
                </td>
                <td>
                  <PersonLink personName={person.fatherName} people={people} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isErrorVisible && <p data-cy="noPeopleMessage">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};
