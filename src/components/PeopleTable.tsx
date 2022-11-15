import classNames from 'classnames';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader/Loader';

type Props = {
  people: Person[],
  isPeopleLoaded: boolean,
};

export const PeopleTable: FC<Props> = ({ people, isPeopleLoaded }) => {
  const [selectedSlug, setSelectedSlug] = useState('');

  return (
    <>
      <table
        data-cy="peopleTable"
        className="
          table
          is-striped
          is-hoverable
          is-narrow
          is-fullwidth
        "
      >
        {!isPeopleLoaded
          ? <Loader />
          : (
            <>
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
                    name, sex, born, died, motherName, fatherName, slug,
                  } = person;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={classNames(
                        { 'has-background-warning': selectedSlug === slug },
                      )}
                    >
                      <td>
                        <Link
                          to={`/people/${slug}`}
                          className={classNames(
                            { 'has-text-danger': sex === 'f' },
                          )}
                          onClick={() => setSelectedSlug(slug)}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td
                        className={classNames(
                          { 'has-text-danger': sex === 'f' },
                        )}
                      >
                        {motherName || '-'}
                      </td>
                      <td
                        className={classNames(
                          { 'has-text-danger': sex === 'f' },
                        )}
                      >
                        {fatherName || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}
      </table>
    </>
  );
};
