import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from './../../types/Person';
import { PersonLink } from '../person-link/person.link';
import { useParams } from 'react-router-dom';

export default function PeoplePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const { slug: targetPersonSlug } = useParams<{ slug: string }>();

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setIsLoading(false);
        setError(null);
      })
      .catch(() => {
        setIsLoading(false);
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePersonClick = (slug: string | null) => {
    setSelectedPersonSlug(slug);
  };

  const shouldApplyBackground = (slug: string) =>
    targetPersonSlug === slug ? 'has-background-warning' : '';

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
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
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={shouldApplyBackground(person.slug)}
                  >
                    <td className={shouldApplyBackground(person.slug)}>
                      <PersonLink
                        person={person}
                        onClick={() => handlePersonClick(person.slug)}
                      >
                        {person.name}
                      </PersonLink>
                    </td>
                    <td className={shouldApplyBackground(person.slug)}>
                      {person.sex}
                    </td>
                    <td className={shouldApplyBackground(person.slug)}>
                      {person.born}
                    </td>
                    <td className={shouldApplyBackground(person.slug)}>
                      {person.died}
                    </td>
                    <td className={shouldApplyBackground(person.slug)}>
                      <PersonLink
                        person={people.find(p => p.name === person.motherName)}
                        onClick={() => handlePersonClick(person.motherName)}
                      >
                        {person.motherName ? person.motherName : '-'}
                      </PersonLink>
                    </td>
                    <td
                      className={
                        selectedPersonSlug === person.slug
                          ? 'has-background-warning'
                          : ''
                      }
                    >
                      <PersonLink
                        person={people.find(p => p.name === person.fatherName)}
                        onClick={() => handlePersonClick(person.fatherName)}
                      >
                        {person.fatherName ? person.fatherName : '-'}
                      </PersonLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
