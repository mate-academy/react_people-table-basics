import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
}

export const PeopleTable: FC<Props> = ({ people, isLoading, isError }) => {
  const { slug = '' } = useParams();

  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName || '-';
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
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
              {people.map((person) => (
                <tr
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': slug === person.slug,
                  })}
                  data-cy="person"
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{findParent(person.motherName)}</td>
                  <td>{findParent(person.fatherName)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
