import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

type Props = {
  selectedPersonName?: string;
};

export const PeopleTable: React.FC<Props> = ({ selectedPersonName = '' }) => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);

        setIsLoading(false);
      });
  }, []);

  const isSelected = (person: Person) => selectedPersonName === person.name;

  const findParents = (
    parentName: string | null,
  ) => {
    const temp = people?.find(({ name }) => name === parentName);

    return temp
      ? (
        <Link
          to={`../${parentName}`}
          className="has-text-danger"
        >
          {parentName}
        </Link>
      )
      : <td>{parentName}</td>;
  };

  return (
    <>
      <div className="box table-container">
        {
          isLoading
            ? (
              <Loader />
            )
            : (
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
                  {
                    people?.map(person => (
                      <tr
                        data-cy="person"
                        className={classNames(
                          { 'has-background-warning': isSelected(person) },
                        )}
                      >
                        <PersonLink
                          person={person}
                          key={person.slug}
                        />

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {findParents(person.motherName) || '-'}
                        </td>
                        <td>
                          {findParents(person.fatherName) || '-'}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )
        }
      </div>
    </>
  );
};
