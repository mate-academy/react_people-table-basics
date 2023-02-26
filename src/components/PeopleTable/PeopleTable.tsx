import classNames from 'classnames';
import { Link, useMatch } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';

type Props = {
  isLoading: boolean,
  hasLoadingError: boolean,
  displayedPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  isLoading,
  hasLoadingError,
  displayedPeople,
}) => {
  const match = useMatch('/people/:slug');
  const activeSlug = match?.params.slug;

  const getPersonByName = (name: string | null) => {
    return displayedPeople
      .find(person => person.name === name);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasLoadingError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!displayedPeople.length) {
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
        {displayedPeople.map(({
          name,
          fatherName,
          motherName,
          slug,
          sex,
          born,
          died,
        }) => {
          const mother = getPersonByName(motherName);
          const father = getPersonByName(fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={
                classNames({ 'has-background-warning': slug === activeSlug })
              }
            >
              <td>
                <Link to={`/people/${slug}`}>
                  {name}
                </Link>

              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother?.slug
                  ? (
                    <Link
                      className="has-text-danger"
                      to={`/people/${mother.slug}`}
                    >
                      {motherName}
                    </Link>
                  )
                  : (
                    <p>{motherName || '-'}</p>
                  )}
              </td>

              <td>
                {father?.slug
                  ? (
                    <Link
                      to={`/people/${father.slug}`}
                    >
                      {fatherName}
                    </Link>
                  )
                  : (
                    <p>{fatherName || '-'}</p>
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
