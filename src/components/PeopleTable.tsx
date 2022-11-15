import classNames from 'classnames';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader/Loader';
import { PersonLink } from './PersonLink';

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

                  const selectedFather: Person | undefined = people.find(el => {
                    return el.name === fatherName;
                  });

                  const selectedMother: Person | undefined = people.find(el => {
                    return el.name === motherName;
                  });

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
                      <td>
                        <PersonLink
                          selectedParent={selectedMother}
                          setSelectedSlug={setSelectedSlug}
                          parentName={motherName}
                        />
                      </td>
                      <td>
                        <PersonLink
                          selectedParent={selectedFather}
                          setSelectedSlug={setSelectedSlug}
                          parentName={fatherName}
                        />
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
