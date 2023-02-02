import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { Loader } from '../Loader';

const headers = [
  { id: 1, title: 'Name' },
  { id: 2, title: 'Sex' },
  { id: 3, title: 'Born' },
  { id: 4, title: 'Died' },
  { id: 5, title: 'Mother' },
  { id: 6, title: 'Father' },
];

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => (
    people.map(human => {
      const mother = people.find(m => (m.name === human.motherName));
      const father = people.find(f => (f.name === human.fatherName));

      return {
        ...human,
        mother,
        father,
      };
    })), [people]);

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {!people.length && !isLoading && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >

        {!isLoading && (
          <>
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            />
            <thead>
              <tr>
                {headers.map(header => <th key={header.id}>{header.title}</th>)}
              </tr>
            </thead>

            <tbody>
              {preparedPeople.map(person => (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames(
                    { 'has-background-warning': person.slug === slug },
                  )}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother
                      ? <PersonLink person={person.mother} />
                      : person.motherName || '-'}
                  </td>

                  <td>
                    {person.father
                      ? <PersonLink person={person.father} />
                      : person.fatherName || '-'}
                  </td>

                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};
