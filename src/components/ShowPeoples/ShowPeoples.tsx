import React from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useNavigate, useParams } from 'react-router-dom';

type Props = {
  error: boolean;
  peoples: Person[] | null;
  showLoader: boolean;
};

export const ShowPeoples: React.FC<Props> = ({
  peoples,
  error,
  showLoader,
}) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  if (peoples === null) {
    return null;
  }

  const searchFather = (person: Person) => {
    const father = peoples.find(p => p.name === person.fatherName);

    return father?.slug || '';
  };

  const searchMother = (person: Person) => {
    const mother = peoples.find(p => p.name === person.motherName);

    return mother?.slug || '';
  };

  if (showLoader) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (peoples.length < 1) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
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
        {peoples.map(person => {
          const isActive = slug === person.slug;
          const fatherSlug = searchFather(person);
          const motherSlug = searchMother(person);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isActive })}
            >
              <td>
                <a
                  onClick={e => {
                    e.preventDefault();
                    navigate(`/people/${person.slug}`);
                  }}
                  className={classNames({
                    'has-text-danger': person.sex === 'm',
                  })}
                  href={`#${person.slug}`}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {motherSlug ? (
                  <Link to={`/people/${motherSlug}`}>{person.motherName}</Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {fatherSlug ? (
                  <Link to={`/people/${fatherSlug}`}>{person.fatherName}</Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
