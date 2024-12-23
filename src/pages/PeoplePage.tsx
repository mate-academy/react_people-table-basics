import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import cn from 'classnames';

const PersonLink: React.FC<{
  name: string | null | undefined;
  person?: Person;
}> = ({ name, person }) => {
  return person ? (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  ) : (
    name || '-'
  );
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then((searchPeople: Person[]) => {
        setPeople(searchPeople);

        if (slug) {
          setSelectedPerson(slug);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [slug]);

  const handleRowClick = (personSlug: string) => {
    setSelectedPerson(personSlug);
  };

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {!loader && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loader && people.length === 0 && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loader && people.length > 0 && (
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
                {people.map((person: Person) => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    motherName,
                    fatherName,
                    slug: personSlug,
                  } = person;
                  const mother = people.find(p => p.name === motherName);
                  const father = people.find(p => p.name === fatherName);

                  return (
                    <tr
                      key={personSlug}
                      data-cy="person"
                      onClick={() => handleRowClick(personSlug)}
                      className={cn({
                        'has-background-warning': selectedPerson === personSlug,
                      })}
                    >
                      <td>
                        <PersonLink name={name} person={person} />
                      </td>
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        <PersonLink name={motherName} person={mother} />
                      </td>
                      <td>
                        <PersonLink name={fatherName} person={father} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
