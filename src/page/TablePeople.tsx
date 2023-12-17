import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { convertToSlug } from '../components/function/convertToSlug';

export const TablePeople = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setError] = useState<string | null>(null);

  const { slug } = useParams();

  function getPersonByName(name: string, peopleArray: Person[]): Person {
    const person = peopleArray.find(p => p.name === name) || {
      name: '',
      sex: '',
      born: 0,
      died: 0,
      fatherName: null,
      motherName: null,
      slug: '',
    };

    return person;
  }

  function getRowClassName(
    person: Person,
    slugTag: string | undefined,
  ) {
    const { name, born } = person;

    const checkSelectedChild = convertToSlug(name, born) === slugTag?.slice(1);

    return classNames({
      'has-background-warning': checkSelectedChild,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!loading && !errorMessage && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Sex
                </th>
                <th>
                  Born
                </th>
                <th>
                  Died
                </th>
                <th>
                  Mother
                </th>
                <th>
                  Father
                </th>
              </tr>
            </thead>
            <tbody>

              {people.map(person => {
                const {
                  name, sex, born, died, motherName, fatherName,
                } = person;
                const isMotherInArray = motherName ? people.map(p => p.name)
                  .includes(motherName) : false;
                const isFatherInArray = fatherName ? people.map(p => p.name)
                  .includes(fatherName) : false;

                return (
                  <tr
                    key={name}
                    data-cy="person"
                    className={getRowClassName(person, slug)}
                  >
                    <td
                      aria-label="CHOOSE"
                    >
                      <PersonLink person={person} />
                    </td>
                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {isMotherInArray ? (
                        <PersonLink
                          person={getPersonByName(motherName!, people)}
                        />
                      ) : (
                        motherName ?? '-'
                      )}
                    </td>
                    <td>
                      {isFatherInArray ? (
                        <PersonLink
                          person={getPersonByName(fatherName!, people)}
                        />
                      ) : (
                        motherName ?? '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>

  );
};
